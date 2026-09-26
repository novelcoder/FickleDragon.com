"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  analyticsConfig,
  analyticsCookieDeletionValues,
  consentCookieValue,
  googleConsent,
  isAnalyticsEnabled,
  readConsentCookie,
  shouldTrackPageView,
} from "@/config/analytics.mjs";

const CONSENT_CHANGED_EVENT = "fickle-dragon:analytics-consent-changed";
const GOOGLE_SCRIPT_ID = "fickle-dragon-google-analytics";

type ConsentChoice = "granted" | "denied";
type ConsentSnapshot = ConsentChoice | "loading" | null;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
  }
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
}

function getConsentSnapshot(): ConsentSnapshot {
  return readConsentCookie(document.cookie);
}

function getServerConsentSnapshot(): ConsentSnapshot {
  return "loading";
}

function getGtag(): Gtag {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  return window.gtag;
}

function setGoogleAnalyticsDisabled(measurementId: string, disabled: boolean) {
  const flags = window as unknown as Record<string, boolean>;
  flags[`ga-disable-${measurementId}`] = disabled;
}

function clearGoogleAnalyticsCookies() {
  const values = analyticsCookieDeletionValues(
    document.cookie,
    window.location.hostname,
    window.location.protocol === "https:",
  );

  for (const value of values) document.cookie = value;
}

function writeConsentCookie(choice: ConsentChoice) {
  document.cookie = consentCookieValue(
    choice,
    window.location.protocol === "https:",
  );
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

export function AnalyticsConsent({ measurementId }: { measurementId: string | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const choice = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [settingsAreOpen, setSettingsAreOpen] = useState(false);
  const initializedMeasurementId = useRef<string | null>(null);
  const lastTrackedLocation = useRef<string | null>(null);
  const settingsTitle = useRef<HTMLHeadingElement>(null);
  const settingsButton = useRef<HTMLButtonElement>(null);
  const returnFocusToSettings = useRef(false);
  const query = searchParams.toString();
  const pagePath = query ? `${pathname}?${query}` : pathname;
  const analyticsIsEnabled = isAnalyticsEnabled(measurementId, choice);
  const panelIsOpen = settingsAreOpen || choice === null;

  useEffect(() => {
    if (!measurementId || !analyticsIsEnabled) return;

    const gtag = getGtag();
    const firstInitialization = initializedMeasurementId.current !== measurementId;

    setGoogleAnalyticsDisabled(measurementId, false);

    if (firstInitialization) {
      gtag("consent", "default", googleConsent("denied"));
    }

    gtag("consent", "update", googleConsent("granted"));

    if (firstInitialization) {
      gtag("js", new Date());
      gtag("set", "ads_data_redaction", true);
      gtag("config", measurementId, analyticsConfig());
      initializedMeasurementId.current = measurementId;
    }

    if (shouldTrackPageView(lastTrackedLocation.current, pagePath)) {
      gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: pagePath,
        page_title: document.title,
        send_to: measurementId,
      });
      lastTrackedLocation.current = pagePath;
    }
  }, [analyticsIsEnabled, measurementId, pagePath]);

  useEffect(() => {
    if (!settingsAreOpen) return;

    settingsTitle.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && choice !== null) {
        returnFocusToSettings.current = true;
        setSettingsAreOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [choice, settingsAreOpen]);

  useEffect(() => {
    if (panelIsOpen || !returnFocusToSettings.current) return;

    returnFocusToSettings.current = false;
    settingsButton.current?.focus();
  }, [panelIsOpen]);

  if (!measurementId || choice === "loading") return null;

  const saveChoice = (nextChoice: ConsentChoice) => {
    if (nextChoice === "denied") {
      setGoogleAnalyticsDisabled(measurementId, true);
      window.gtag?.("consent", "update", googleConsent("denied"));
      clearGoogleAnalyticsCookies();
      lastTrackedLocation.current = null;
    }

    returnFocusToSettings.current = true;
    writeConsentCookie(nextChoice);
    setSettingsAreOpen(false);
  };

  const closeSettings = () => {
    returnFocusToSettings.current = true;
    setSettingsAreOpen(false);
  };

  return (
    <>
      {analyticsIsEnabled ? (
        <Script
          id={GOOGLE_SCRIPT_ID}
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
          strategy="afterInteractive"
        />
      ) : null}

      {panelIsOpen ? (
        <section
          className="cookie-consent"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="cookie-consent-copy">
            <p className="cookie-consent-label">Your privacy choice</p>
            <h2 id="cookie-consent-title" ref={settingsTitle} tabIndex={-1}>
              Optional analytics
            </h2>
            <p id="cookie-consent-description">
              Allow Google Analytics to help us understand which pages readers
              use. Declining does not change how the site works. Advertising
              tracking stays off. <Link href="/privacy">Privacy &amp; cookies</Link>
            </p>
          </div>
          <div className="cookie-consent-actions">
            <button type="button" onClick={() => saveChoice("denied")}>
              Decline
            </button>
            <button type="button" onClick={() => saveChoice("granted")}>
              Allow analytics
            </button>
            {choice !== null ? (
              <button
                className="cookie-consent-close"
                type="button"
                onClick={closeSettings}
              >
                Keep current choice
              </button>
            ) : null}
          </div>
        </section>
      ) : (
        <button
          className="cookie-settings-button"
          ref={settingsButton}
          type="button"
          onClick={() => setSettingsAreOpen(true)}
        >
          Cookie settings
        </button>
      )}
    </>
  );
}
