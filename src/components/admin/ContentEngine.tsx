import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  FileText,
  Sparkles,
  Send,
  Calendar,
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminSession } from "@/hooks/useAdminSession";

const API_BASE =
  import.meta.env.VITE_CONTENT_API_URL ??
  // Fallback for dev with local proxy — likely 404 until real API is deployed.
  "";

// =============================================================================
// Content engine — admin panel
// =============================================================================
// This is the authenticated workspace for drafting, generating, and distributing
// posts. Access is gated behind authentication (see docs/content-engine.md for
// the Cognito / hosted-UI setup).
//
// Flow:
//   1. Write the source blog post (or describe a topic + outline)
//   2. Click "Generate platform versions" — a Lambda calls Claude with
//      platform-specific prompts and returns four tailored drafts
//   3. Edit each platform's draft inline
//   4. Toggle which platforms publish, then Publish Now or Schedule
//   5. The publish action fans out to per-platform Lambdas which call each
//      platform's API (LinkedIn Posts, FB Graph, IG Graph, YouTube Data)
//
// Backend endpoints expected (see infrastructure/):
//   POST /api/content/generate      → { blogSource, title } → platform variants
//   POST /api/content/save          → persist post + variants
//   POST /api/content/publish       → fan out to platform Lambdas
//   POST /api/content/schedule      → EventBridge rule, fires publish later
// =============================================================================

type Platform = "blog" | "linkedin" | "facebook" | "instagram" | "youtube";

interface PlatformMeta {
  key: Platform;
  label: string;
  icon: React.ReactNode;
  // Character budgets — soft guidance that matches what tends to perform well
  // on each platform. Not enforced hard limits (except Twitter/X, which we
  // don't include here).
  charBudget: string;
  hint: string;
}

const PLATFORMS: PlatformMeta[] = [
  {
    key: "blog",
    label: "Blog (source)",
    icon: <FileText className="w-4 h-4" />,
    charBudget: "No limit",
    hint: "The source of truth. Long-form. Written once, adapted for everywhere else.",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin className="w-4 h-4" />,
    charBudget: "~1,300 chars",
    hint: "Hook in the first two lines. Short paragraphs. No link in body — drop the URL in the first comment.",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: <Facebook className="w-4 h-4" />,
    charBudget: "~200 chars ideal",
    hint: "Shorter performs better. Conversational tone. OG image pulls from blog cover.",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
    charBudget: "~2,200 chars max",
    hint: "First line is the hook. Hashtags in a closing block. Business account required.",
  },
  {
    key: "youtube",
    label: "YouTube (community)",
    icon: <Youtube className="w-4 h-4" />,
    charBudget: "~1,500 chars",
    hint: "Community post — not a video. Link back to blog. Poll optional.",
  },
];

interface PostDraft {
  title: string;
  blogSource: string;
  variants: Record<Platform, string>;
  publishTo: Record<Platform, boolean>;
}

const INITIAL_DRAFT: PostDraft = {
  title: "",
  blogSource: "",
  variants: {
    blog: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
  publishTo: {
    blog: true,
    linkedin: true,
    facebook: true,
    instagram: true,
    youtube: false, // opt-in — community posts less frequent
  },
};

type GenerateStatus = "idle" | "generating" | "done" | "error";
type PublishStatus =
  | "idle"
  | "publishing"
  | "published"
  | "partial"
  | "error";
type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function ContentEngine() {
  const { email, getAuthToken, signOut } = useAdminSession();
  const navigate = useNavigate();

  const [draft, setDraft] = useState<PostDraft>(INITIAL_DRAFT);
  const [activeTab, setActiveTab] = useState<Platform>("blog");
  const [generateStatus, setGenerateStatus] =
    useState<GenerateStatus>("idle");
  const [publishStatus] = useState<PublishStatus>("idle");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [savedPostId, setSavedPostId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function authedFetch(
    path: string,
    init: RequestInit
  ): Promise<Response> {
    const token = await getAuthToken();
    if (!token) {
      // Session expired mid-session → bounce to login
      navigate("/admin/login?next=/engine", { replace: true });
      throw new Error("Session expired. Please sign in again.");
    }
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${token}`);
    if (!headers.has("Content-Type") && init.body) {
      headers.set("Content-Type", "application/json");
    }
    return fetch(`${API_BASE}${path}`, { ...init, headers });
  }

  const activePlatform = useMemo(
    () => PLATFORMS.find((p) => p.key === activeTab)!,
    [activeTab]
  );

  const currentChars = draft.variants[activeTab].length;

  // -----------------------------------------------------------------------
  // Actions
  // -----------------------------------------------------------------------
  async function handleGenerate() {
    if (!draft.blogSource.trim() || !draft.title.trim()) {
      setError("Need a title and a blog draft to generate variants.");
      return;
    }
    setError(null);
    setGenerateStatus("generating");

    try {
      // Expected response shape:
      //   { variants: { linkedin: "...", facebook: "...", ... } }
      const res = await authedFetch("/api/content/generate", {
        method: "POST",
        body: JSON.stringify({
          title: draft.title,
          blogSource: draft.blogSource,
        }),
      });
      if (!res.ok) throw new Error(`Generate failed: ${res.status}`);
      const data = (await res.json()) as {
        variants: Partial<Record<Platform, string>>;
      };
      setDraft((d) => ({
        ...d,
        variants: {
          ...d.variants,
          linkedin: data.variants.linkedin ?? d.variants.linkedin,
          facebook: data.variants.facebook ?? d.variants.facebook,
          instagram: data.variants.instagram ?? d.variants.instagram,
          youtube: data.variants.youtube ?? d.variants.youtube,
        },
      }));
      setGenerateStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
      setGenerateStatus("error");
    }
  }

  async function handleSaveDraft() {
    if (!draft.title.trim()) {
      setError("Need a title before saving.");
      return;
    }
    setError(null);
    setSaveStatus("saving");
    try {
      const res = await authedFetch("/api/content/posts", {
        method: "POST",
        body: JSON.stringify({
          id: savedPostId ?? undefined,
          title: draft.title,
          blogSource: draft.blogSource,
          variants: draft.variants,
        }),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      const data = (await res.json()) as { id: string };
      setSavedPostId(data.id);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaveStatus("error");
    }
  }

  // Publishing is not yet wired. Button is disabled in the UI below with a
  // tooltip; this stub exists so the button's onClick type-checks.
  async function handlePublish() {
    /* intentionally no-op until publish Lambdas land */
  }

  function setVariant(platform: Platform, value: string) {
    setDraft((d) => ({
      ...d,
      variants: { ...d.variants, [platform]: value },
    }));
  }

  function togglePlatform(platform: Platform) {
    setDraft((d) => ({
      ...d,
      publishTo: { ...d.publishTo, [platform]: !d.publishTo[platform] },
    }));
  }

  const enabledCount = Object.values(draft.publishTo).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin bar */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-primary font-mono text-sm" aria-hidden="true">
              ▮
            </span>
            <span className="font-mono text-sm">
              cto-on-demand<span className="text-muted-foreground">.inc</span>{" "}
              / <span className="text-primary">engine</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <a
              href="/admin/drafts"
              className="hover:text-foreground transition-colors"
            >
              Drafts
            </a>
            <span className="text-border">·</span>
            <a
              href="/admin/scheduled"
              className="hover:text-foreground transition-colors"
            >
              Scheduled
            </a>
            <span className="text-border">·</span>
            <a
              href="/admin/published"
              className="hover:text-foreground transition-colors"
            >
              Published
            </a>
            <span className="text-border">·</span>
            <a
              href="/admin/connections"
              className="hover:text-foreground transition-colors"
            >
              Connections
            </a>
            <span className="text-border">·</span>
            {email && (
              <span className="font-mono text-xs text-foreground/80 truncate max-w-[220px]">
                {email}
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                signOut();
                navigate("/admin/login", { replace: true });
              }}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Page header */}
        <div className="mb-8">
          <p className="font-mono text-[0.6875rem] tracking-[0.2em] uppercase text-primary mb-2">
            // new post
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Write once. Distribute everywhere.
          </h1>
          <p className="text-muted-foreground mt-2">
            Draft the blog source, generate platform-tailored versions, review,
            ship.
          </p>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block font-mono text-xs tracking-wider uppercase text-muted-foreground mb-2">
            Title
          </label>
          <Input
            value={draft.title}
            onChange={(e) =>
              setDraft((d) => ({ ...d, title: e.target.value }))
            }
            placeholder="The fractional CTO intake checklist I use on every engagement"
            className="text-lg"
          />
        </div>

        {/* Platform tabs */}
        <div className="mb-4 border-b border-border/50 flex flex-wrap gap-1">
          {PLATFORMS.map((p) => {
            const isActive = activeTab === p.key;
            const hasContent = draft.variants[p.key].length > 0;
            return (
              <button
                key={p.key}
                onClick={() => setActiveTab(p.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm",
                  "border-b-2 -mb-px transition-all duration-200",
                  isActive
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {p.icon}
                {p.label}
                {hasContent && (
                  <CheckCircle2 className="w-3 h-3 text-primary/70" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active tab editor */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[0.6875rem] tracking-wider uppercase text-muted-foreground">
              {activePlatform.hint}
            </p>
            <span
              className={cn(
                "font-mono text-xs tracking-wider",
                currentChars > 0 ? "text-primary" : "text-muted-foreground"
              )}
            >
              {currentChars.toLocaleString()} chars · budget{" "}
              {activePlatform.charBudget}
            </span>
          </div>
          <Textarea
            value={
              activeTab === "blog"
                ? draft.blogSource
                : draft.variants[activeTab]
            }
            onChange={(e) => {
              if (activeTab === "blog") {
                setDraft((d) => ({
                  ...d,
                  blogSource: e.target.value,
                  variants: { ...d.variants, blog: e.target.value },
                }));
              } else {
                setVariant(activeTab, e.target.value);
              }
            }}
            placeholder={
              activeTab === "blog"
                ? "Write the long-form blog post here. Markdown OK. This is the source — every other platform variant is derived from this."
                : `Your ${activePlatform.label} version. Click 'Generate platform versions' to draft automatically from the blog source, or write it by hand.`
            }
            className="min-h-[320px] font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Platform publish toggles */}
        <div className="mb-8 p-5 rounded-lg border border-border/50 bg-card/30">
          <p className="font-mono text-[0.6875rem] tracking-wider uppercase text-muted-foreground mb-3">
            // publish destinations
          </p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.filter((p) => p.key !== "blog").map((p) => {
              const enabled = draft.publishTo[p.key];
              return (
                <button
                  key={p.key}
                  onClick={() => togglePlatform(p.key)}
                  aria-pressed={enabled}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                    "border transition-all duration-200",
                    enabled
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border/70 bg-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {p.icon}
                  {p.label}
                  {enabled && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 rounded-md border border-destructive/50 bg-destructive/10 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-destructive">Heads up</p>
              <p className="text-sm text-foreground/90 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 sticky bottom-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg border border-border/60">
          <Button
            onClick={handleGenerate}
            disabled={
              generateStatus === "generating" ||
              !draft.blogSource.trim() ||
              !draft.title.trim()
            }
            variant="outline"
            className="gap-2"
          >
            {generateStatus === "generating" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {generateStatus === "generating"
              ? "Generating…"
              : "Generate platform versions"}
          </Button>

          <Button
            onClick={handleSaveDraft}
            disabled={saveStatus === "saving" || !draft.title.trim()}
            variant="outline"
            className="gap-2"
          >
            {saveStatus === "saving" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saveStatus === "saved" ? (
              <CheckCircle2 className="w-4 h-4 text-primary" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveStatus === "saving"
              ? "Saving…"
              : saveStatus === "saved"
              ? "Saved"
              : savedPostId
              ? "Update draft"
              : "Save draft"}
          </Button>

          <Button variant="outline" className="gap-2" disabled>
            <Eye className="w-4 h-4" />
            Preview
          </Button>

          <Button variant="outline" className="gap-2" disabled>
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>

          <div className="flex-1" />

          <span className="font-mono text-xs text-muted-foreground">
            {enabledCount} destination{enabledCount === 1 ? "" : "s"}
          </span>

          <Button
            onClick={handlePublish}
            disabled
            className="gap-2 bg-primary hover:bg-primary/90"
            title="Publishing connections not yet configured."
          >
            <Send className="w-4 h-4" />
            Publish now
          </Button>
        </div>

        {/* Success / status strip */}
        {publishStatus === "published" && (
          <div className="mt-4 p-4 rounded-md border border-primary/40 bg-primary/10 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <p className="text-sm">
              Published to all {enabledCount} destinations. Check{" "}
              <a href="/admin/published" className="text-primary underline">
                Published
              </a>{" "}
              for links.
            </p>
          </div>
        )}
        {publishStatus === "partial" && (
          <div className="mt-4 p-4 rounded-md border border-amber-500/40 bg-amber-500/10 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <p className="text-sm">
              Published with some failures. See{" "}
              <a href="/admin/published" className="text-primary underline">
                Published
              </a>{" "}
              for per-platform status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
