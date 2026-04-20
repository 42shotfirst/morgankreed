export type FitVerdict =
  | "STRONG FIT"
  | "PARTIAL FIT — WORTH A CONVERSATION"
  | "WEAK FIT"
  | "UNCLEAR";

export interface FitCheckResponse {
  verdict: FitVerdict;
  why: string;
  transfers: string[];
  gaps: string[];
  recommendation: string;
  raw: string;
}

interface FitCheckRequest {
  input: string;
}

// TODO: Backend endpoint is not implemented yet. When built, the server must:
//   1. Load /system_prompt_fit.txt as the system prompt.
//   2. Call Anthropic with model `claude-sonnet-4-6` (per project memory),
//      passing the user input as the user turn.
//   3. Return `{ result: string }` where `result` is the model's raw output
//      (this file's parseFitResponse expects the **Verdict/Why/... headers
//      from the prompt's output format — do not post-process on the server).
// The endpoint path defaults to /api/fit-check; override with VITE_FIT_CHECK_API_URL.
// Until wired, DEV mode returns a canned sample (see DEV_SAMPLE below) and
// production will 404.
const ENDPOINT =
  import.meta.env.VITE_FIT_CHECK_API_URL ?? "/api/fit-check";

const DEV_SAMPLE = `**Verdict**: PARTIAL FIT — WORTH A CONVERSATION

**Why**: This is a partial fit because the role leans on regulated-industry fluency and a senior operator who can own the roadmap end-to-end — both square with CTO on Demand's strongest pattern. The unknown is scale: the JD implies a 40+ engineer org, which is beyond what a fractional engagement is shaped for.

**What transfers well**:
- Regulated-industry compliance posture (SOC 2, PCI) → direct experience at Western Alliance Bank, Amex, USAA
- AI roadmap ownership → active implementation at current engagement
- Vendor and build-vs-buy decisions at the CFO-visibility level

**Honest gaps for this role**:
- Has not managed a 40+ engineer organization as a line manager
- No public-company reporting cadence experience

**Recommendation**: Worth a 30-minute fit call. If the role can be framed as fractional leadership alongside an existing VP of Engineering, the match is strong. If it truly requires full-time line management at that scale, hire full-time — a fractional engagement is the wrong shape.`;

export function parseFitResponse(raw: string): FitCheckResponse {
  const section = (label: string) => {
    const re = new RegExp(
      `\\*\\*${label}\\*\\*\\s*:?\\s*([\\s\\S]*?)(?=\\n\\*\\*|$)`,
      "i"
    );
    return raw.match(re)?.[1]?.trim() ?? "";
  };

  const bullets = (block: string) =>
    block
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("-"))
      .map((l) => l.replace(/^-\s*/, ""));

  const verdictText = section("Verdict").toUpperCase();
  let verdict: FitVerdict = "UNCLEAR";
  if (verdictText.includes("STRONG")) verdict = "STRONG FIT";
  else if (verdictText.includes("PARTIAL"))
    verdict = "PARTIAL FIT — WORTH A CONVERSATION";
  else if (verdictText.includes("WEAK")) verdict = "WEAK FIT";

  return {
    verdict,
    why: section("Why"),
    transfers: bullets(section("What transfers well")),
    gaps: bullets(section("Honest gaps for this role")),
    recommendation: section("Recommendation"),
    raw,
  };
}

export async function runFitCheck(
  input: string,
  signal?: AbortSignal
): Promise<FitCheckResponse> {
  if (!input.trim()) {
    throw new Error("Paste a job description or problem statement first.");
  }

  if (import.meta.env.DEV) {
    await new Promise((r) => setTimeout(r, 900));
    return parseFitResponse(DEV_SAMPLE);
  }

  const body: FitCheckRequest = { input };
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Fit checker returned ${response.status}. Try again in a moment.`
    );
  }

  const data = (await response.json()) as { result?: string };
  if (!data.result) {
    throw new Error("Fit checker returned an empty response.");
  }

  return parseFitResponse(data.result);
}
