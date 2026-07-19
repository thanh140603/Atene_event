import { useEffect, useState } from 'react';

function readRoute(): string {
  // "#/competition" -> "/competition"; "#about" -> "about"; "" -> ""
  return window.location.hash.replace(/^#/, '');
}

/** Minimal hash-based route watcher — avoids pulling in a router dependency. */
export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
