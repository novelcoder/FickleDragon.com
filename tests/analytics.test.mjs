import assert from "node:assert/strict";
import test from "node:test";

import {
  CONSENT_COOKIE_NAME,
  COOKIE_MAX_AGE_SECONDS,
  analyticsConfig,
  analyticsCookieDeletionValues,
  analyticsCookieNames,
  consentCookieValue,
  googleConsent,
  isAnalyticsEnabled,
  readConsentCookie,
  shouldTrackPageView,
  validMeasurementId,
} from "../config/analytics.mjs";

test("GA4 measurement IDs are normalized and strictly validated", () => {
  assert.equal(validMeasurementId(" G-SS2ZB4J95T "), "G-SS2ZB4J95T");
  assert.equal(validMeasurementId("g-ss2zb4j95t"), "G-SS2ZB4J95T");
  assert.equal(validMeasurementId("UA-123-4"), null);
  assert.equal(validMeasurementId("G-TOO-SHORT"), null);
  assert.equal(validMeasurementId(undefined), null);
});

test("consent cookies persist a versioned choice for six months", () => {
  const granted = consentCookieValue("granted", true);
  const denied = consentCookieValue("denied", false);

  assert.match(granted, new RegExp(`^${CONSENT_COOKIE_NAME}=granted\\.v1;`));
  assert.match(granted, new RegExp(`Max-Age=${COOKIE_MAX_AGE_SECONDS}`));
  assert.match(granted, /Path=\//);
  assert.match(granted, /SameSite=Lax/);
  assert.match(granted, /Secure$/);
  assert.ok(!denied.includes("Secure"));
  assert.equal(readConsentCookie(`other=x; ${granted.split(";", 1)[0]}`), "granted");
  assert.equal(readConsentCookie(`${CONSENT_COOKIE_NAME}=denied.v1`), "denied");
  assert.equal(readConsentCookie(`${CONSENT_COOKIE_NAME}=granted.v0`), null);
  assert.equal(readConsentCookie(`${CONSENT_COOKIE_NAME}=maybe.v1`), null);
});

test("analytics config disables automatic page views and advertising features", () => {
  assert.deepEqual(analyticsConfig(), {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: COOKIE_MAX_AGE_SECONDS,
    cookie_update: false,
    send_page_view: false,
  });

  assert.deepEqual(googleConsent("granted"), {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  assert.equal(googleConsent("denied").analytics_storage, "denied");
});

test("analytics activates only after consent and deduplicates route page views", () => {
  assert.equal(isAnalyticsEnabled("G-SS2ZB4J95T", "granted"), true);
  assert.equal(isAnalyticsEnabled("G-SS2ZB4J95T", "denied"), false);
  assert.equal(isAnalyticsEnabled("malformed", "granted"), false);
  assert.equal(isAnalyticsEnabled(null, "granted"), false);

  assert.equal(shouldTrackPageView(null, "/privacy"), true);
  assert.equal(shouldTrackPageView("/privacy", "/privacy"), false);
  assert.equal(shouldTrackPageView("/privacy", "/about"), true);
  assert.equal(shouldTrackPageView("/about", "/about?source=nav"), true);
  assert.equal(shouldTrackPageView("/about", "not-a-path"), false);
});

test("withdrawal targets only accessible first-party GA cookies", () => {
  const header =
    "fd_analytics_consent=granted.v1; _ga=GA1.1.1.1; session=x; _ga_ABC=GS1.1";
  assert.deepEqual(analyticsCookieNames(header), ["_ga", "_ga_ABC"]);

  const deletions = analyticsCookieDeletionValues(
    header,
    "www.fickledragon.com",
    true,
  );
  assert.equal(deletions.length, 6);
  assert.ok(deletions.every((value) => value.includes("Max-Age=0")));
  assert.ok(deletions.every((value) => value.includes("Path=/")));
  assert.ok(deletions.every((value) => value.includes("Secure")));
  assert.ok(deletions.some((value) => value.includes("Domain=fickledragon.com")));
  assert.ok(deletions.every((value) => !value.startsWith("session=")));
});
