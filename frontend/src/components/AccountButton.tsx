import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { GOOGLE_CLIENT_ID, requestGoogleLogin } from '../lib/google';
import { useT } from '../i18n/LanguageProvider';

/** Header account widget: a dark "Log in" pill that flips to "Log out" once signed in. */
export default function AccountButton() {
  const { user, signIn, signOut } = useAuth();
  const t = useT();
  const [busy, setBusy] = useState(false);

  if (user) {
    return (
      <button
        onClick={signOut}
        title={user.email}
        className="btn-pill border border-neutral-300 bg-white text-neutral-700 shadow-sm hover:border-neutral-900 hover:text-neutral-900"
      >
        {t('nav.logOut')}
      </button>
    );
  }

  const login = async () => {
    if (!GOOGLE_CLIENT_ID) {
      if (import.meta.env.DEV) {
        signIn({ email: 'dev.creator@gmail.com', name: 'Dev Creator', credential: 'dev' });
      }
      return;
    }
    setBusy(true);
    try {
      signIn(await requestGoogleLogin());
    } catch {
      /* user closed the popup or sign-in failed — no-op */
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={login}
      disabled={busy}
      className="btn-pill bg-neutral-900 text-white hover:opacity-90 disabled:opacity-50"
    >
      {busy ? t('nav.loggingIn') : t('nav.logIn')}
    </button>
  );
}
