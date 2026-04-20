import { useEffect, useState } from "react";
import {
  getCurrentSession,
  getUserEmail,
  getIdToken,
  signOut as cognitoSignOut,
} from "@/lib/cognito";

export interface AdminSession {
  email: string | null;
  loading: boolean;
  signedIn: boolean;
  getAuthToken: () => Promise<string | null>;
  signOut: () => void;
}

export function useAdminSession(): AdminSession {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await getCurrentSession();
      if (cancelled) return;
      if (session) {
        const e = await getUserEmail();
        if (!cancelled) setEmail(e);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    email,
    loading,
    signedIn: !!email,
    getAuthToken: getIdToken,
    signOut: () => {
      cognitoSignOut();
      setEmail(null);
    },
  };
}
