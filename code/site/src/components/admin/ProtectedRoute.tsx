import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminSession } from "@/hooks/useAdminSession";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { signedIn, loading } = useAdminSession();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          verifying session…
        </div>
      </div>
    );
  }

  if (!signedIn) {
    return (
      <Navigate
        to={`/admin/login?next=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        replace
      />
    );
  }

  return <>{children}</>;
}
