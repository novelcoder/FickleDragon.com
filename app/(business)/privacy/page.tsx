import styles from "@/app/ui/business-page.module.css";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="privacy-heading">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Privacy</p>
          <h1 id="privacy-heading">A straightforward site and a straightforward policy.</h1>
          <p className={styles.intro}>
            This page explains what information may be handled when you visit
            Fickle Dragon Publishing or contact us by email.
          </p>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <span className="contact-monogram">FD</span>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Information handled by this site</h2>
          <p>
            This site does not currently offer visitor accounts, comments,
            checkout, or a contact form. We do not use advertising pixels,
            advertising cookies, or personalized advertising.
          </p>
          <p>
            Like most hosted websites, the hosting and delivery systems may
            process technical information needed to serve and protect the site.
            That can include an IP address, browser or device information,
            requested pages, timestamps, referring pages, and security logs.
          </p>

          <h2>Email inquiries</h2>
          <p>
            If you email us, we receive the address you use and the information
            you include. We use it to answer your inquiry, conduct publishing
            business, maintain appropriate business records, and protect our
            legal interests. Please do not send sensitive personal information
            that is not needed for your request.
          </p>

          <h2>Sharing and retention</h2>
          <p>
            We do not sell personal information. Information may be handled by
            service providers that support website hosting, email, security, or
            business operations, and may be disclosed when required by law or
            needed to protect rights and safety. We retain information only as
            long as reasonably needed for those purposes and applicable records.
          </p>

          <h2>External destinations</h2>
          <p>
            This site links to author sites, retailers, distributors, and other
            services that operate under their own privacy practices. Their
            policies apply after you follow those links.
          </p>

          <h2>Optional Google Analytics</h2>
          <p>
            If you select <strong>Allow analytics</strong>, this site loads
            Google Analytics 4 for the existing Fickle Dragon property. We use
            it to understand aggregate activity such as which pages are visited,
            how visitors reached the site, and general usage patterns. Declining
            analytics does not affect site functionality, and no Google
            Analytics script, request, or cookie is initiated before consent.
          </p>
          <p>
            When allowed, Google Analytics may receive the page URL and title,
            visit time, referring page, approximate location, and browser,
            device, operating-system, and screen information. Google uses IP
            addresses during collection for routing and approximate location;
            Google states that GA4 does not log or store individual IP addresses.
            We do not intentionally send names, email addresses, or other direct
            identifiers.
          </p>
          <p>
            Advertising storage, advertising user data, advertising
            personalization, Google Signals, and ad-personalization signals are
            disabled in this implementation. This site does not use Google
            Analytics for remarketing or advertising profiles.
          </p>

          <h2>Cookies and retention</h2>
          <p>
            The first-party <code>fd_analytics_consent</code> cookie remembers
            whether you allowed or declined analytics for six months. It is
            necessary to respect your choice. If you allow analytics, Google may
            also create the first-party <code>_ga</code> cookie to distinguish a
            pseudonymous browser and a <code>_ga_&lt;measurement-id&gt;</code>
            cookie to preserve session state. We configure those Analytics
            cookies with a maximum duration of six months from consent; their
            expiry is not extended on each page view.
          </p>

          <h2>Review or withdraw consent</h2>
          <p>
            Use the persistent <strong>Cookie settings</strong> button at the
            lower left of any page to review or change your choice. If you
            withdraw consent, the site disables further Analytics collection and
            attempts to delete accessible first-party <code>_ga</code> cookies
            for this site. Browser restrictions, a different cookie domain or
            path, or cookies already removed by the browser can limit what
            client-side deletion can reach. Withdrawing consent does not remove
            aggregate or previously collected data already processed by Google.
          </p>
          <p>
            Google provides more information in its{" "}
            <a
              href="https://support.google.com/analytics/answer/6004245"
              rel="noreferrer"
            >
              Google Analytics data safeguards
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/privacy" rel="noreferrer">
              privacy policy
            </a>
            .
          </p>

          <h2>Questions</h2>
          <p>
            For a privacy question or request concerning information you sent
            directly to Fickle Dragon, email{" "}
            <a href="mailto:jamie@fickledragon.com">jamie@fickledragon.com</a>.
          </p>
          <p className={styles.finePrint}>Last updated September 25, 2026.</p>
        </section>
      </div>
    </main>
  );
}
