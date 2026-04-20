import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  signIn,
  completeNewPassword,
  verifyTotp,
  submitMfaCode,
  type AuthStep,
} from "@/lib/cognito";
import { Logo } from "@/components/Logo";

type Screen =
  | "credentials"
  | "new-password"
  | "mfa-setup"
  | "mfa-code"
  | "signed-in";

export default function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") ?? "/engine";

  const [screen, setScreen] = useState<Screen>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [authStep, setAuthStep] = useState<Extract<
    AuthStep,
    { type: Exclude<AuthStep["type"], "signed-in"> }
  > | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function advance(step: AuthStep) {
    if (step.type === "signed-in") {
      setScreen("signed-in");
      navigate(next, { replace: true });
      return;
    }
    setAuthStep(step);
    const screenFor: Record<
      Exclude<AuthStep["type"], "signed-in">,
      Screen
    > = {
      "new-password-required": "new-password",
      "mfa-setup": "mfa-setup",
      "mfa-code": "mfa-code",
    };
    setScreen(screenFor[step.type]);
  }

  async function onSubmitCredentials(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const step = await signIn(email, password);
      advance(step);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmitNewPassword(e: React.FormEvent) {
    e.preventDefault();
    if (authStep?.type !== "new-password-required") return;
    setSubmitting(true);
    setError(null);
    try {
      const step = await completeNewPassword(
        authStep.user,
        newPassword,
        authStep.userAttributes
      );
      advance(step);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password update failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmitMfaSetup(e: React.FormEvent) {
    e.preventDefault();
    if (authStep?.type !== "mfa-setup") return;
    setSubmitting(true);
    setError(null);
    try {
      await verifyTotp(authStep.user, mfaCode);
      // After MFA setup, Cognito signs the session in automatically for this
      // verification flow — we can treat it as signed-in.
      advance({ type: "signed-in" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "TOTP verification failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmitMfaCode(e: React.FormEvent) {
    e.preventDefault();
    if (authStep?.type !== "mfa-code") return;
    setSubmitting(true);
    setError(null);
    try {
      await submitMfaCode(authStep.user, mfaCode);
      advance({ type: "signed-in" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "MFA code invalid");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Logo variant="mark" className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">
            CTO{" "}
            <span className="text-muted-foreground font-normal text-xs tracking-[0.2em] uppercase">
              on demand
            </span>{" "}
            <span className="text-primary font-mono text-sm">/ engine</span>
          </span>
        </div>

        <div
          className={cn(
            "rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm",
            "p-8 shadow-lg"
          )}
        >
          <div className="mb-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <h1 className="text-xl font-bold mb-1">Admin sign-in</h1>
              <p className="text-sm text-muted-foreground">
                Single-admin console. MFA required.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-md border border-destructive/50 bg-destructive/10 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/90">{error}</p>
            </div>
          )}

          {screen === "credentials" && (
            <form onSubmit={onSubmitCredentials} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          )}

          {screen === "new-password" && (
            <form onSubmit={onSubmitNewPassword} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                First-time sign-in. Choose a new password (14+ chars, mixed
                case, number, symbol).
              </p>
              <div>
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoFocus
                  autoComplete="new-password"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating…
                  </>
                ) : (
                  "Set password"
                )}
              </Button>
            </form>
          )}

          {screen === "mfa-setup" && authStep?.type === "mfa-setup" && (
            <form onSubmit={onSubmitMfaSetup} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Scan this in your authenticator app (1Password, Authy, Google
                Authenticator), then enter the 6-digit code.
              </p>
              <div className="p-4 rounded border border-border/60 bg-background/50 font-mono text-xs break-all">
                {/* Raw secret. In a fuller setup we'd render a QR. */}
                otpauth://totp/cto-on-demand:{email}?secret={authStep.secretCode}
                &issuer=cto-on-demand
              </div>
              <div>
                <Label htmlFor="mfa">6-digit code</Label>
                <Input
                  id="mfa"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  required
                  autoFocus
                  autoComplete="one-time-code"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting || mfaCode.length !== 6}
                className="w-full"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  "Verify and enable MFA"
                )}
              </Button>
            </form>
          )}

          {screen === "mfa-code" && (
            <form onSubmit={onSubmitMfaCode} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code from your authenticator app.
              </p>
              <div>
                <Label htmlFor="mfa">6-digit code</Label>
                <Input
                  id="mfa"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  required
                  autoFocus
                  autoComplete="one-time-code"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting || mfaCode.length !== 6}
                className="w-full"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
          // access gated. inquiries → morgan.reed@ctoondemandinc.com
        </p>
      </div>
    </div>
  );
}
