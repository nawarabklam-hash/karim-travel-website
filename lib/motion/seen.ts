/**
 * Entrance animations play once per page per browser session. After that the
 * page shows its content at once (no Motion work, no delay). The flag lives in
 * sessionStorage, keyed by the path (locale included: /ar/about, /en/about).
 */

/** Set on <html> once the current page has been seen: CSS shows [data-motion] at once. */
export const SEEN_ATTR = "data-motion-seen";

const PREFIX = "motion-seen:";

export function isSeen(pathname: string): boolean {
  try {
    return sessionStorage.getItem(PREFIX + pathname) === "1";
  } catch {
    // Private mode or blocked storage: treat as first visit (animate).
    return false;
  }
}

export function markSeen(pathname: string): void {
  try {
    sessionStorage.setItem(PREFIX + pathname, "1");
  } catch {
    // Nothing to do: the page will simply animate again next time.
  }
}

/** True while the current page is marked seen (used by components that run later). */
export const motionIsSeenNow = () =>
  document.documentElement.hasAttribute(SEEN_ATTR);

/**
 * Runs inline in <body> before the page paints, so a seen page never shows its
 * hidden start state. A reload (F5 or the browser's reload button) counts as a
 * fresh visit: the page's flag is cleared and it animates again.
 */
export const seenScript = `(function(){try{var k=${JSON.stringify(
  PREFIX,
)}+location.pathname;var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){sessionStorage.removeItem(k);return}if(sessionStorage.getItem(k)==="1")document.documentElement.setAttribute(${JSON.stringify(
  SEEN_ATTR,
)},"")}catch(e){}})();`;
