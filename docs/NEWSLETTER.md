# Newsletter setup

No account was created, no paid plan was selected and no newsletter was sent. Until configured, `/api/subscribe` returns a clear 503 response without storing or forwarding an email.

## Recommended starting point

MailerLite **Free, without payment details**, is the prepared integration. As checked on 15 September 2026, its [pricing page](https://www.mailerlite.com/pricing) lists up to 250 subscribers and 2,500 monthly sends. It provides [CSV subscriber export](https://www.mailerlite.com/help/how-to-export-subscribers) and [double opt-in for API/integrations](https://www.mailerlite.com/help/how-to-use-double-opt-in-when-collecting-subscribers).

Free accounts reaching their active-subscriber limit have sending locked rather than being automatically charged. Paid accounts can automatically move to a higher billing tier: **do not add payment details or choose a paid plan without reviewing that behaviour**. Limits and pricing can change; check the provider before account creation. No usage-billed infrastructure was added to this site.

The site only creates/updates subscriptions using the [subscriber API](https://developers.mailerlite.com/api/subscribers). No campaign, automation or sending endpoint is used. A double opt-in confirmation email is the only intended provider email at signup.

## Exact steps

1. Create/approve a free MailerLite account yourself. Review its [privacy policy](https://www.mailerlite.com/legal/privacy-policy) and [data processing agreement](https://www.mailerlite.com/legal/data-processing-agreement), including processing locations/transfers. Keep the free/no-card setup for initial signup collection.
2. Set the sender identity to Jonathan Hill and a working address you control. Complete the provider's verification steps. Don't create a campaign or any subscriber-triggered welcome/newsletter automation.
3. Create a subscriber group specifically for the novel. Copy its group ID (available in the dashboard or [groups API](https://developers.mailerlite.com/api/groups)).
4. Create a MailerLite API token in the account's Integrations/API area. Keep it in local/server secrets only. Ensure your account's current free API access supports adding subscribers.
5. In **Account settings → Subscribe settings**, turn **Double opt-in for API and integrations** ON. Form-level opt-in alone does not apply to this server integration. Verify the confirmation email/thank-you experience. Free accounts may restrict customisation of the confirmation email.
6. Copy `.env.example` to `.env.local` and set:

   ```dotenv
   MAILERLITE_API_KEY=your-private-token
   MAILERLITE_GROUP_ID=your-novel-group-id
   MAILERLITE_DOUBLE_OPT_IN_CONFIRMED=true
   ```

7. Put the same three **server-only** settings in the existing Vercel project's production environment. Never use a `NEXT_PUBLIC_` prefix. Do not add them to Git. Remove local QA settings (`CONTENT_DIR`, `NEWSLETTER_TEST_MODE`) from deployment environments.
8. Review `/privacy` against the actual account setup and verify that `jonathan.hill@hillmade.uk` can receive deletion requests. Update processor/contact wording if necessary.
9. Rebuild and deploy only when authorised. Test using your own address on **hillmade.uk**: form submit → confirmation email → confirm → group membership. Verify that unconfirmed addresses aren't eligible for your updates, and test unsubscribe/deletion. Don't send a newsletter yet. Production preview domains refuse signup to avoid adding preview visitors to the real list.

The `...CONFIRMED` variable is an operator acknowledgement, not an automatic check of the provider's settings. Provider availability, account approval and actual email delivery cannot be tested without the account. Existing unsubscribed subscribers can be handled differently by the API; don't force them active to bypass opt-in. Review re-subscription with the provider if needed.

## Local UI testing without credentials

In `.env.local`, set `NEWSLETTER_TEST_MODE=local`, then restart `npm run dev`. Any syntactically valid address tests the confirmation UI; `error@example.invalid` tests a provider-error UI. Check the consent box. The page explicitly says this is a local preview and neither stores nor sends email. The mock flag is ignored when `NODE_ENV=production`.

Remove that flag to test missing configuration. Submit with consent: the form shows an accessible error with alternatives. Native email/required-checkbox validation handles invalid input. Test the network failure state by interrupting the local service if needed; unit tests also exercise thrown transport errors.

## Data and spam handling

Only email + the novel group are sent to MailerLite. Consent is explicit in the UI; opt-in/confirmation records are managed by the provider. There is a hidden honeypot, same-origin JSON requirement, a 4 KB request limit, an 8-second transport timeout and a one-minute limiter with hashed addresses. The limiter is per server instance, not a guarantee against distributed abuse; existing hosting protections and provider opt-in remain useful. Emails/provider responses are never logged or returned by the application.

The UK [ICO's electronic mail marketing guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/) is the reference for reviewing your actual consent and email workflow. The implementation/privacy page does not provide a legal compliance guarantee.

Export: Subscribers → select the novel group/statuses → select subscribers → choose visible columns → Actions → CSV. Keep exports privately, not in this repository. Changing providers requires replacing the small server transport and privacy wording; the website and content stay portable.
