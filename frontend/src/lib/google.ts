// Helpers for Google Identity Services (GIS) "Sign in with Google".

const GIS_SRC = 'https://accounts.google.com/gsi/client';

let scriptPromise: Promise<void> | null = null;

/** Load the GIS client script once and resolve when window.google is ready. */
export function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${GIS_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('GIS load failed')));
      return;
    }
    const s = document.createElement('script');
    s.src = GIS_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('GIS load failed'));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

interface GoogleJwtPayload {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string;
}

/** Decode (without verifying) a Google ID token to read basic profile fields. */
export function decodeJwt(token: string): GoogleJwtPayload | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
    return JSON.parse(json) as GoogleJwtPayload;
  } catch {
    return null;
  }
}

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';

interface UserInfo {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
}

/**
 * Open Google's OAuth popup, then resolve the signed-in profile.
 * Lets us use a fully custom "Log in" button instead of Google's fixed widget.
 */
export function requestGoogleLogin(): Promise<{
  email: string;
  name: string;
  picture?: string;
  googleId: string;
  credential: string;
}> {
  return new Promise((resolve, reject) => {
    loadGoogleScript()
      .then(() => {
        const oauth2 = window.google?.accounts?.oauth2;
        if (!oauth2 || !GOOGLE_CLIENT_ID) {
          reject(new Error('Google Sign-In unavailable'));
          return;
        }
        const client = oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          // Fires when the user closes/cancels the popup or the flow fails to
          // open — the success `callback` never runs in those cases.
          error_callback: (err) => {
            reject(new Error(err?.type ?? 'Sign-in cancelled'));
          },
          callback: async (resp) => {
            if (resp.error || !resp.access_token) {
              reject(new Error(resp.error ?? 'Sign-in failed'));
              return;
            }
            try {
              const r = await fetch(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${resp.access_token}` } },
              );
              const info = (await r.json()) as UserInfo;
              if (!info.email) {
                reject(new Error('No email on Google account'));
                return;
              }
              resolve({
                email: info.email,
                name: info.name ?? '',
                picture: info.picture,
                googleId: info.sub ?? '',
                credential: resp.access_token,
              });
            } catch (err) {
              reject(err as Error);
            }
          },
        });
        client.requestAccessToken();
      })
      .catch(reject);
  });
}
