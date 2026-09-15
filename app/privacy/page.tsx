import { newsletterState } from "@/lib/newsletter";
import { contactEmail, pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacy",
  "How Jonathan Hill handles email subscriptions and minimal personal data on this writing archive.",
  "/privacy",
);
export default function PrivacyPage() {
  const { configured, testing } = newsletterState();
  return (
    <main id="main" tabIndex={-1}>
      <header className="page-heading shell">
        <p className="meta">A small site. A small amount of data.</p>
        <h1>
          Privacy<span className="red-period">.</span>
        </h1>
        <p>
          This is Jonathan Hill&apos;s writing archive, based in Stockport, UK.
        </p>
      </header>
      <div className="reading-layout shell">
        <aside className="reading-margin">
          <span className="meta">Questions or deletion</span>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </aside>
        <article className="prose">
          <h2>Email updates</h2>
          <p>
            {configured && !testing
              ? "When you subscribe, I collect your email address and your consent to receive new chapters and important book updates. MailerLite receives and manages the subscription on my behalf."
              : "Email signup isn't open yet. MailerLite is the intended newsletter processor. Until it is configured, a signup attempt won't store your email or send it to that service."}
          </p>
          <p>
            Once signup is open, you&apos;ll be asked to confirm by email. The
            provider keeps the email address and subscription/confirmation
            history needed to manage the list. I use your consent to send
            updates about the writing and the finished book; I don&apos;t sell
            the list.
          </p>
          <p>
            You can unsubscribe using the link in any update. You can also email{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a> to withdraw
            consent, ask what data I hold, or request deletion. I keep
            subscription data while you want updates; if you leave, a minimal
            suppression record may be retained to avoid emailing you again.
            Deletion requests are handled with the provider, including any
            applicable backup retention.
          </p>
          <p>
            MailerLite&apos;s own{" "}
            <a href="https://www.mailerlite.com/legal/privacy-policy">
              privacy information
            </a>{" "}
            and{" "}
            <a href="https://www.mailerlite.com/legal/data-processing-agreement">
              data processing agreement
            </a>{" "}
            describe its processing and any international transfers. These
            should be reviewed before signup is enabled.
          </p>
          <h2>Visiting this site</h2>
          <p>
            This site doesn&apos;t use advertising, analytics cookies or X
            embeds. Following an external link takes you to a service with its
            own privacy practices.
          </p>
          <p>
            Vercel hosts the site and Cloudflare serves the domain. They may
            process technical request information such as IP addresses,
            requested pages and security logs to deliver and protect the site.
            Their retention is governed by their policies; this site
            doesn&apos;t add a visitor-profile database.
          </p>
          <h2>Keeping signup minimal</h2>
          <p>
            The signup handler doesn&apos;t log email addresses or save them in
            this repository. To discourage repeated requests, it temporarily
            holds a hash of the submitted address for up to a minute. This is a
            short-lived anti-spam measure, not a subscriber list. Double opt-in
            is managed by the newsletter provider.
          </p>
          <p>
            This notice describes the intended setup. If the processor or data
            use changes, I&apos;ll update it here.
          </p>
        </article>
      </div>
    </main>
  );
}
