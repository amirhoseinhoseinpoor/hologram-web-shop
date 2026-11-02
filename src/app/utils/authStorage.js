// Persistent user session (survives refresh / closing the browser).
// Stored in localStorage with its own expiry, bounded by the JWT `exp` claim.

const STORAGE_KEY = "azar_site_auth_v1";
const SESSION_DAYS = Number(process.env.NEXT_PUBLIC_SESSION_DAYS) || 7;

export const AUTH_STORAGE_KEY = STORAGE_KEY;

const PERSISTED_FIELDS = [
  "token",
  "firstName",
  "lastName",
  "phoneNumber",
  "code",
  "email",
  "gender",
];

function decodeJwtExpMs(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(payload));
    return typeof json.exp === "number" ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

function readRaw() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable (private mode / quota) – ignore */
  }
}

export function loadSession() {
  if (typeof window === "undefined") return null;
  const session = readRaw();
  if (
    !session?.token ||
    !session.expiresAt ||
    session.expiresAt <= Date.now()
  ) {
    if (session) clearSession();
    return null;
  }
  return session;
}

export function saveSession(auth) {
  if (typeof window === "undefined" || !auth?.token) return;

  const previous = readRaw();
  let expiresAt;
  if (previous?.token === auth.token && previous.expiresAt) {
    // same login → never extend the lifetime on every state change
    expiresAt = previous.expiresAt;
  } else {
    expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
    const jwtExp = decodeJwtExpMs(auth.token);
    if (jwtExp) expiresAt = Math.min(expiresAt, jwtExp);
  }

  const data = { expiresAt };
  PERSISTED_FIELDS.forEach((f) => (data[f] = auth[f] ?? null));

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable (private mode / quota) – ignore */
  }
}
