export const CONSENT_COOKIE_NAME = "fd_analytics_consent";
export const CONSENT_COOKIE_VERSION = "v1";
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const COOKIE_RETENTION_DESCRIPTION = "six months";

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{10}$/;

export function validMeasurementId(value) {
  if (typeof value !== "string") return null;

  const normalized = value.trim().toUpperCase();
  return MEASUREMENT_ID_PATTERN.test(normalized) ? normalized : null;
}

export function isAnalyticsEnabled(measurementId, choice) {
  return validMeasurementId(measurementId) !== null && choice === "granted";
}

export function shouldTrackPageView(previousPath, nextPath) {
  return (
    typeof nextPath === "string" &&
    nextPath.startsWith("/") &&
    previousPath !== nextPath
  );
}

export function readConsentCookie(cookieHeader) {
  if (typeof cookieHeader !== "string") return null;

  const prefix = `${CONSENT_COOKIE_NAME}=`;
  const encodedValue = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(prefix))
    ?.slice(prefix.length);

  if (!encodedValue) return null;

  let value;
  try {
    value = decodeURIComponent(encodedValue);
  } catch {
    return null;
  }

  if (value === `granted.${CONSENT_COOKIE_VERSION}`) return "granted";
  if (value === `denied.${CONSENT_COOKIE_VERSION}`) return "denied";
  return null;
}

export function consentCookieValue(choice, secure = true) {
  if (choice !== "granted" && choice !== "denied") {
    throw new TypeError("Consent choice must be granted or denied.");
  }

  return [
    `${CONSENT_COOKIE_NAME}=${choice}.${CONSENT_COOKIE_VERSION}`,
    "Path=/",
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
    secure ? "Secure" : null,
  ]
    .filter(Boolean)
    .join("; ");
}

export function analyticsCookieNames(cookieHeader) {
  if (typeof cookieHeader !== "string") return [];

  return Array.from(
    new Set(
      cookieHeader
        .split(";")
        .map((cookie) => cookie.trim().split("=", 1)[0])
        .filter((name) => name === "_ga" || name.startsWith("_ga_")),
    ),
  );
}

export function analyticsCookieDeletionValues(cookieHeader, hostname, secure = true) {
  const names = analyticsCookieNames(cookieHeader);
  if (names.length === 0) return [];

  const normalizedHostname = String(hostname ?? "").toLowerCase();
  const domainCandidates = new Set();

  if (
    normalizedHostname === "fickledragon.com" ||
    normalizedHostname.endsWith(".fickledragon.com")
  ) {
    domainCandidates.add(normalizedHostname);
    domainCandidates.add("fickledragon.com");
  }

  const secureAttribute = secure ? "; Secure" : "";
  const values = [];

  for (const name of names) {
    const base = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secureAttribute}`;
    values.push(base);

    for (const domain of domainCandidates) {
      values.push(`${base}; Domain=${domain}`);
    }
  }

  return values;
}

export function analyticsConfig() {
  return {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: COOKIE_MAX_AGE_SECONDS,
    cookie_update: false,
    send_page_view: false,
  };
}

export function googleConsent(analyticsStorage) {
  if (analyticsStorage !== "granted" && analyticsStorage !== "denied") {
    throw new TypeError("Analytics storage must be granted or denied.");
  }

  return {
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}
