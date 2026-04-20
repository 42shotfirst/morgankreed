import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

// -----------------------------------------------------------------------------
// Cognito client setup — lazily initialised so the public site doesn't crash
// when VITE_COGNITO_* env vars are absent.
// -----------------------------------------------------------------------------

let _userPool: CognitoUserPool | null = null;

function getUserPool(): CognitoUserPool {
  if (!_userPool) {
    _userPool = new CognitoUserPool({
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID ?? "",
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID ?? "",
    });
  }
  return _userPool;
}

export function getCurrentUser(): CognitoUser | null {
  return getUserPool().getCurrentUser();
}

export function getCurrentSession(): Promise<CognitoUserSession | null> {
  return new Promise((resolve) => {
    const user = getUserPool().getCurrentUser();
    if (!user) return resolve(null);
    user.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session || !session.isValid()) return resolve(null);
        resolve(session);
      }
    );
  });
}

export async function getIdToken(): Promise<string | null> {
  const session = await getCurrentSession();
  return session?.getIdToken().getJwtToken() ?? null;
}

export async function getUserEmail(): Promise<string | null> {
  const user = getUserPool().getCurrentUser();
  const session = await getCurrentSession();
  if (!user || !session) return null;
  return new Promise((resolve) => {
    user.getUserAttributes(
      (err: Error | undefined, attrs: CognitoUserAttribute[] | undefined) => {
        if (err || !attrs) return resolve(null);
        const emailAttr = attrs.find((a) => a.getName() === "email");
        resolve(emailAttr?.getValue() ?? null);
      }
    );
  });
}

export type AuthStep =
  | { type: "signed-in" }
  | { type: "new-password-required"; user: CognitoUser; userAttributes: Record<string, string> }
  | { type: "mfa-setup"; user: CognitoUser; secretCode: string }
  | { type: "mfa-code"; user: CognitoUser };

export function signIn(
  email: string,
  password: string
): Promise<AuthStep> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getUserPool() });
    const details = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(details, {
      onSuccess: () => resolve({ type: "signed-in" }),
      onFailure: (err) => reject(err),
      newPasswordRequired: (userAttributes) => {
        // Cognito returns these read-only attributes we must echo back
        delete userAttributes.email_verified;
        delete userAttributes.email;
        resolve({ type: "new-password-required", user, userAttributes });
      },
      mfaSetup: () => {
        user.associateSoftwareToken({
          associateSecretCode: (secretCode: string) => {
            resolve({ type: "mfa-setup", user, secretCode });
          },
          onFailure: (err) => reject(err),
        });
      },
      totpRequired: () => resolve({ type: "mfa-code", user }),
      mfaRequired: () => resolve({ type: "mfa-code", user }),
    });
  });
}

export function completeNewPassword(
  user: CognitoUser,
  newPassword: string,
  userAttributes: Record<string, string>
): Promise<AuthStep> {
  return new Promise((resolve, reject) => {
    user.completeNewPasswordChallenge(newPassword, userAttributes, {
      onSuccess: () => resolve({ type: "signed-in" }),
      onFailure: (err) => reject(err),
      mfaSetup: () => {
        user.associateSoftwareToken({
          associateSecretCode: (secretCode: string) => {
            resolve({ type: "mfa-setup", user, secretCode });
          },
          onFailure: (err) => reject(err),
        });
      },
      totpRequired: () => resolve({ type: "mfa-code", user }),
      mfaRequired: () => resolve({ type: "mfa-code", user }),
    });
  });
}

export function verifyTotp(
  user: CognitoUser,
  code: string,
  deviceName = "Admin Console"
): Promise<void> {
  return new Promise((resolve, reject) => {
    user.verifySoftwareToken(code, deviceName, {
      onSuccess: () => {
        user.setUserMfaPreference(
          null,
          { Enabled: true, PreferredMfa: true },
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      },
      onFailure: (err) => reject(err),
    });
  });
}

export function submitMfaCode(
  user: CognitoUser,
  code: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    user.sendMFACode(
      code,
      {
        onSuccess: () => resolve(),
        onFailure: (err) => reject(err),
      },
      "SOFTWARE_TOKEN_MFA"
    );
  });
}

export function signOut(): void {
  const user = getUserPool().getCurrentUser();
  if (user) user.signOut();
}
