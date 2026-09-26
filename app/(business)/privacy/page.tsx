import type { Metadata } from "next";
import styles from "@/app/ui/business-page.module.css";

export const metadata: Metadata = {
  title: "Privacy | Fickle Dragon Publishing",
  description:
    "How Fickle Dragon Publishing handles website visits, email inquiries, and external links.",
};

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
            checkout, or a contact form. We do not currently use advertising
            pixels or intentionally set analytics cookies.
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

          <h2>Future analytics and site features</h2>
          <p>
            Fickle Dragon expects to add privacy-conscious analytics. If
            analytics, optional cookies, embedded media, forms, or other data-
            collecting features are introduced, this policy and any required
            consent controls will be updated to match the implemented behavior.
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
