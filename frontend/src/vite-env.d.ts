/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_VIDEO_BASE_URL?: string;
  /** Google OAuth 2.0 Web client ID for "Sign in with Google". */
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Minimal typings for the Google Identity Services (GIS) client. */
interface Window {
  google?: {
    accounts: {
      id: {
        initialize(config: {
          client_id: string;
          callback: (response: { credential: string }) => void;
          auto_select?: boolean;
        }): void;
        renderButton(
          parent: HTMLElement,
          options: Record<string, unknown>,
        ): void;
        disableAutoSelect(): void;
      };
      oauth2: {
        initTokenClient(config: {
          client_id: string;
          scope: string;
          callback: (response: {
            access_token?: string;
            error?: string;
          }) => void;
          error_callback?: (error: { type?: string; message?: string }) => void;
        }): { requestAccessToken(): void };
      };
    };
  };
}
