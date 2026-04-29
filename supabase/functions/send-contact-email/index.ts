// Supabase Edge Function — send-contact-email
// Triggered by the contact form on the frontend.
// Sends two emails via Resend:
//   1. Admin notification with all submission details
//   2. Professional auto-reply to the customer

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const ADMIN_EMAIL    = Deno.env.get("ADMIN_EMAIL")    ?? "admin@ssocials.co";
const FROM_DOMAIN    = Deno.env.get("FROM_DOMAIN")    ?? "ssocials.co";

// ─── CORS ──────────────────────────────────────────────────────────────────────

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ─── Resend helper ─────────────────────────────────────────────────────────────

async function sendEmail(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to:   [payload.to],
      subject: payload.subject,
      html:    payload.html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[Resend] Error:", err);
    throw new Error(`Resend API error: ${res.status}`);
  }
}

// ─── HTML Templates ────────────────────────────────────────────────────────────

interface FormData {
  client_name:    string;
  client_email:   string;
  business_name:  string;
  industry:       string;
  service_needed: string;
  budget_range:   string;
  phone:          string;
}

function adminEmailHtml(d: FormData): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;background:#f7f5f2;border-bottom:1px solid #e8e4df;
                 font-size:11px;letter-spacing:0.08em;color:#03234d;opacity:0.5;
                 text-transform:uppercase;width:160px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e8e4df;
                 font-size:14px;color:#03234d;">
        ${value || "—"}
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Consultation Request</title>
</head>
<body style="margin:0;padding:0;background:#f0ece6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#03234d;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:0.25em;color:rgba(255,253,251,0.5);
                      text-transform:uppercase;">S.Socials</p>
            <p style="margin:8px 0 0;font-size:13px;letter-spacing:0.15em;
                      color:rgba(255,253,251,0.7);font-weight:300;">Admin Notification</p>
          </td>
        </tr>

        <!-- Alert bar -->
        <tr>
          <td style="background:#1a3d6e;padding:14px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;letter-spacing:0.12em;color:#fffdfb;
                      text-transform:uppercase;">New consultation request received</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px 40px;">
            <p style="margin:0 0 6px;font-size:18px;color:#03234d;font-weight:400;">
              ${d.client_name} is interested in working with S.Socials.
            </p>
            <p style="margin:0 0 28px;font-size:13px;color:#03234d;opacity:0.5;">
              Submitted via the website contact form.
            </p>

            <!-- Details table -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e8e4df;border-radius:2px;overflow:hidden;">
              ${row("Name",           d.client_name)}
              ${row("Email",          d.client_email)}
              ${row("Business",       d.business_name)}
              ${row("Industry",       d.industry.replace(/-/g, " "))}
              ${row("Service needed", d.service_needed.replace(/-/g, " "))}
              ${row("Budget range",   d.budget_range.replace(/-/g, " "))}
              ${row("Phone",          d.phone)}
            </table>

            <!-- Reply CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td>
                  <a href="mailto:${d.client_email}?subject=Re: Your consultation request — S.Socials&body=Dear ${d.client_name},%0A%0AThank you for reaching out to S.Socials.%0A%0A"
                     style="display:inline-block;padding:13px 28px;background:#03234d;
                            color:#fffdfb;text-decoration:none;font-size:11px;
                            letter-spacing:0.18em;text-transform:uppercase;">
                    Reply to ${d.client_name}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f7f5f2;padding:20px 40px;text-align:center;
                     border-top:1px solid #e8e4df;">
            <p style="margin:0;font-size:11px;color:#03234d;opacity:0.4;letter-spacing:0.05em;">
              S.Socials · Admin system · This email is for internal use only.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function customerEmailHtml(d: FormData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>We've received your request — S.Socials</title>
</head>
<body style="margin:0;padding:0;background:#f0ece6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#03234d;padding:40px 40px 32px;text-align:center;">
            <p style="margin:0;font-size:22px;letter-spacing:0.2em;color:#fffdfb;
                      font-weight:300;text-transform:uppercase;">S.Socials</p>
            <div style="margin:16px auto 0;width:40px;height:1px;background:rgba(255,253,251,0.25);"></div>
            <p style="margin:14px 0 0;font-size:10px;letter-spacing:0.25em;
                      color:rgba(255,253,251,0.45);text-transform:uppercase;">
              Health · Beauty · Wellness
            </p>
          </td>
        </tr>

        <!-- Divider bar -->
        <tr>
          <td style="background:#1a3d6e;padding:1px 0;"></td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#fffdfb;padding:44px 40px 36px;">

            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.18em;
                      color:#03234d;opacity:0.4;text-transform:uppercase;">
              Thank you
            </p>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:300;
                       color:#03234d;letter-spacing:-0.02em;line-height:1.2;">
              We've received your<br/>consultation request.
            </h1>

            <div style="width:40px;height:1px;background:#03234d;opacity:0.15;margin:0 0 24px;"></div>

            <p style="margin:0 0 16px;font-size:15px;color:#03234d;line-height:1.7;
                      opacity:0.75;">
              Dear ${d.client_name},
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#03234d;line-height:1.7;opacity:0.65;">
              Thank you for reaching out to S.Socials. We're excited to learn more about
              <strong style="font-weight:500;opacity:1;">${d.business_name}</strong>
              and how we can help elevate your brand in the
              ${d.industry.replace(/-/g, " ")} space.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#03234d;line-height:1.7;opacity:0.65;">
              A member of our team will be in touch within
              <strong style="font-weight:500;">24 hours</strong>
              to discuss your goals and how we can best serve you.
            </p>

            <!-- What happens next -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#f7f5f2;border-left:3px solid #03234d;
                          margin:0 0 36px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 10px;font-size:10px;letter-spacing:0.18em;
                            color:#03234d;opacity:0.45;text-transform:uppercase;">
                    What happens next
                  </p>
                  <p style="margin:0 0 8px;font-size:13px;color:#03234d;
                            line-height:1.6;opacity:0.7;">
                    1. We'll review your request and prepare for our discovery call.
                  </p>
                  <p style="margin:0 0 8px;font-size:13px;color:#03234d;
                            line-height:1.6;opacity:0.7;">
                    2. We'll reach out to schedule a consultation at a time that suits you.
                  </p>
                  <p style="margin:0;font-size:13px;color:#03234d;
                            line-height:1.6;opacity:0.7;">
                    3. Together, we'll map out how to transform your brand.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Your submission summary -->
            <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.12em;
                      color:#03234d;opacity:0.4;text-transform:uppercase;">
              Your submission summary
            </p>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e8e4df;margin:0 0 36px;">
              <tr>
                <td style="padding:9px 14px;border-bottom:1px solid #e8e4df;
                           font-size:12px;color:#03234d;opacity:0.5;width:140px;">Service</td>
                <td style="padding:9px 14px;border-bottom:1px solid #e8e4df;
                           font-size:13px;color:#03234d;text-transform:capitalize;">
                  ${d.service_needed.replace(/-/g, " ")}
                </td>
              </tr>
              <tr>
                <td style="padding:9px 14px;font-size:12px;color:#03234d;opacity:0.5;">Industry</td>
                <td style="padding:9px 14px;font-size:13px;color:#03234d;text-transform:capitalize;">
                  ${d.industry.replace(/-/g, " ")}
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <a href="https://www.ssocials.co"
                     style="display:inline-block;padding:13px 28px;background:#03234d;
                            color:#fffdfb;text-decoration:none;font-size:11px;
                            letter-spacing:0.18em;text-transform:uppercase;">
                    Visit Our Website
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#03234d;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;
                      color:rgba(255,253,251,0.6);text-transform:uppercase;">S.Socials</p>
            <p style="margin:0;font-size:11px;color:rgba(255,253,251,0.3);
                      letter-spacing:0.04em;line-height:1.6;">
              Elevating brands in health, beauty &amp; wellness.<br/>
              This is an automated message — please do not reply directly to this email.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Handler ───────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS });
  }

  try {
    const data: FormData = await req.json();

    if (!data.client_name || !data.client_email) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields" }),
        { status: 400, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    // Send both emails concurrently
    await Promise.all([
      sendEmail({
        from:    `S.Socials Admin <admin@${FROM_DOMAIN}>`,
        to:      ADMIN_EMAIL,
        subject: `New consultation request — ${data.client_name} (${data.business_name})`,
        html:    adminEmailHtml(data),
      }),
      sendEmail({
        from:    `S.Socials <hello@${FROM_DOMAIN}>`,
        to:      data.client_email,
        subject: `We've received your request — S.Socials`,
        html:    customerEmailHtml(data),
      }),
    ]);

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { ...CORS, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[send-contact-email]", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Failed to send emails" }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
