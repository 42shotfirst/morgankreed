import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  runFitCheck,
  type FitCheckResponse,
  type FitVerdict,
} from "@/lib/fitCheck";
import { smoothScrollTo } from "@/hooks/useScrollAnimation";

const MIN_CHARS = 80;
const MAX_CHARS = 8000;

const verdictStyles: Record<FitVerdict, { badge: string; label: string }> = {
  "STRONG FIT": {
    badge: "bg-primary/15 text-primary border-primary/40",
    label: "STRONG FIT",
  },
  "PARTIAL FIT — WORTH A CONVERSATION": {
    badge: "bg-amber-500/15 text-amber-500 border-amber-500/40",
    label: "PARTIAL FIT",
  },
  "WEAK FIT": {
    badge:
      "bg-muted text-muted-foreground border-border",
    label: "WEAK FIT",
  },
  UNCLEAR: {
    badge:
      "bg-muted text-muted-foreground border-border",
    label: "NEEDS MORE CONTEXT",
  },
};

export default function FitCheck() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">(
    "idle"
  );
  const [result, setResult] = useState<FitCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const charCount = input.length;
  const tooShort = charCount > 0 && charCount < MIN_CHARS;
  const tooLong = charCount > MAX_CHARS;
  const canSubmit =
    status !== "running" && charCount >= MIN_CHARS && !tooLong;

  const submit = async () => {
    if (!canSubmit) return;
    setStatus("running");
    setError(null);
    setResult(null);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await runFitCheck(input, controller.signal);
      setResult(res);
      setStatus("done");
    } catch (e) {
      if ((e as Error).name === "AbortError") {
        setStatus("idle");
        return;
      }
      setError(
        e instanceof Error ? e.message : "Something broke. Try again shortly."
      );
      setStatus("error");
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setInput("");
    setResult(null);
    setError(null);
    setStatus("idle");
  };

  const scrollToContact = () => smoothScrollTo("contact", 80);

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div
        className={cn(
          "rounded-xl border bg-card/60 backdrop-blur-sm",
          "border-border/60 shadow-sm",
          "p-5 md:p-6"
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="fit-input"
            className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-muted-foreground"
          >
            Paste a JD or describe the problem
          </label>
          <span
            className={cn(
              "font-mono text-[0.6875rem] tabular-nums",
              tooLong
                ? "text-destructive"
                : tooShort
                ? "text-muted-foreground"
                : "text-muted-foreground"
            )}
          >
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>

        <Textarea
          id="fit-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste the full job description, or describe the problem you're trying to solve in 2–3 paragraphs. The more specific the inputs — team size, stage, stack, constraints, deadline — the sharper the read."
          disabled={status === "running"}
          rows={10}
          className={cn(
            "min-h-[220px] resize-y font-mono text-sm leading-relaxed",
            "bg-background/60 border-border/60",
            "focus-visible:ring-primary/40"
          )}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {tooShort
              ? `A bit more context gets a better answer — aim for at least ${MIN_CHARS} characters.`
              : "Nothing you paste is stored. The assessment is candid; no sales pitch."}
          </p>
          <div className="flex items-center gap-2">
            {(status === "done" || status === "error") && (
              <Button
                onClick={reset}
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                New check
              </Button>
            )}
            <Button
              onClick={submit}
              disabled={!canSubmit}
              className={cn(
                "bg-primary hover:bg-primary/90 text-primary-foreground font-medium",
                "min-w-[140px]"
              )}
            >
              {status === "running" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Assessing…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Run fit check
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {status === "error" && error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "rounded-lg border border-destructive/40 bg-destructive/5",
              "p-4 flex items-start gap-3"
            )}
          >
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-foreground font-medium mb-1">
                Fit checker couldn't complete that request
              </p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {status === "done" && result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "rounded-xl border bg-card/60 backdrop-blur-sm",
              "border-primary/40 shadow-lg shadow-primary/5",
              "p-6 md:p-7 space-y-6"
            )}
          >
            {/* Verdict */}
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                // verdict
              </p>
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-md border",
                  "font-mono text-xs tracking-[0.15em] uppercase",
                  verdictStyles[result.verdict].badge
                )}
              >
                {verdictStyles[result.verdict].label}
              </span>
            </div>

            {/* Why */}
            {result.why && (
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  // why
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  {result.why}
                </p>
              </div>
            )}

            {/* Transfers + Gaps grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {result.transfers.length > 0 && (
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    // what transfers well
                  </p>
                  <ul className="space-y-2">
                    {result.transfers.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.gaps.length > 0 && (
                <div>
                  <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    // honest gaps
                  </p>
                  <ul className="space-y-2">
                    {result.gaps.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Recommendation + CTA */}
            {result.recommendation && (
              <div className="pt-5 border-t border-border/50">
                <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  // recommendation
                </p>
                <p className="text-foreground leading-relaxed mb-5">
                  {result.recommendation}
                </p>
                <Button
                  onClick={scrollToContact}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start a conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
