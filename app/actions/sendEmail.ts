
'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendEmail(formData: FormData) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    const toEmail = process.env.RESEND_TO_EMAIL

    if (!apiKey || !fromEmail || !toEmail) {
      console.error('Resend configuration is incomplete.')
      return {
        success: false,
        error: 'Email service is not properly configured. Please try again later.'
      }
    }

    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const inquiryType = String(
      formData.get('inquiry_type') || 'General Inquiry'
    ).trim()
    const message = String(formData.get('message') || '').trim()

    if (!name || !email || !message) {
      return {
        success: false,
        error: 'Please complete all required fields.'
      }
    }

    if (
      name.length > 120 ||
      email.length > 254 ||
      inquiryType.length > 150 ||
      message.length > 10000
    ) {
      return {
        success: false,
        error: 'One or more fields exceed the permitted length.'
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address.'
      }
    }

    // Escape all user-submitted content before inserting into HTML.
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeInquiry = escapeHtml(inquiryType)
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />')

    const plainMessage = message.replace(/\r?\n/g, '\n')

    // NACE Netherlands branded email template.
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NACE Netherlands - New Contact Message</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #eef2f7;
  font-family: 'Trebuchet MS', Arial, sans-serif;
">

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #eef2f7; padding: 20px 8px;"
  >
    <tr>
      <td align="center">

        <!-- MAIN EMAIL CONTAINER -->
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 700px;
            background-color: #ffffff;
            border: 3px solid #092b3b;
            border-radius: 20px;
            overflow: hidden;
          "
        >

          <!-- HEADER -->
          <tr>
            <td style="padding: 16px 16px 10px 16px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                bgcolor="#0878bd"
                style="
                  background-color: #0878bd;
                  background-image: linear-gradient(
                    120deg,
                    #ed2424 0%,
                    #e85c72 28%,
                    #168bd0 65%,
                    #062e70 100%
                  );
                  border: 3px solid #092b3b;
                  border-radius: 15px;
                "
              >
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 28px 15px;
                      color: #ffffff;
                      font-family: 'Trebuchet MS', Arial, sans-serif;
                    "
                  >

                    <h1 style="
                      margin: 0;
                      font-size: 36px;
                      line-height: 1.3;
                      font-weight: 900;
                      letter-spacing: 0.5px;
                      color: #ffffff;
                    ">
                      NACE NETHERLANDS
                    </h1>

                    <p style="
                      margin: 8px 0 0 0;
                      font-size: 27px;
                      line-height: 1.3;
                      font-weight: 800;
                      color: #ffffff;
                    ">
                      nace-netherlands.org
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- NAME -->
          <tr>
            <td style="padding: 10px 16px 0 16px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                bgcolor="#07529a"
                style="
                  background-color: #07529a;
                  background-image: linear-gradient(
                    110deg,
                    #07529a,
                    #1688ca,
                    #062e70
                  );
                  border: 3px solid #092b3b;
                  border-radius: 15px;
                "
              >
                <tr>
                  <td style="
                    padding: 13px 15px;
                    color: #ffffff;
                    font-size: 25px;
                    line-height: 1.4;
                    font-weight: 800;
                    overflow-wrap: anywhere;
                  ">
                    Name:
                    <span style="font-weight: 700;">
                      ${safeName}
                    </span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- EMAIL -->
          <tr>
            <td style="padding: 10px 16px 0 16px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                bgcolor="#07529a"
                style="
                  background-color: #07529a;
                  background-image: linear-gradient(
                    110deg,
                    #07529a,
                    #1688ca,
                    #062e70
                  );
                  border: 3px solid #092b3b;
                  border-radius: 15px;
                "
              >
                <tr>
                  <td style="
                    padding: 13px 15px;
                    color: #ffffff;
                    font-size: 25px;
                    line-height: 1.4;
                    font-weight: 800;
                    overflow-wrap: anywhere;
                  ">
                    Email:
                    <a
                      href="mailto:${safeEmail}"
                      style="
                        color: #ffffff;
                        text-decoration: none;
                        font-weight: 700;
                      "
                    >
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- INQUIRY TYPE -->
          <tr>
            <td style="padding: 10px 16px 0 16px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                bgcolor="#07529a"
                style="
                  background-color: #07529a;
                  background-image: linear-gradient(
                    110deg,
                    #07529a,
                    #1688ca,
                    #062e70
                  );
                  border: 3px solid #092b3b;
                  border-radius: 15px;
                "
              >
                <tr>
                  <td style="
                    padding: 13px 15px;
                    color: #ffffff;
                    font-size: 25px;
                    line-height: 1.4;
                    font-weight: 800;
                    overflow-wrap: anywhere;
                  ">
                    Inquiry Type:
                    <span style="font-weight: 700;">
                      ${safeInquiry}
                    </span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding: 20px 16px 20px 16px;">

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                bgcolor="#0878bd"
                style="
                  background-color: #0878bd;
                  background-image: linear-gradient(
                    120deg,
                    #0055a3 0%,
                    #168bd0 55%,
                    #062e70 100%
                  );
                  border: 3px solid #092b3b;
                  border-radius: 20px;
                "
              >
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 22px 18px;
                      color: #ffffff;
                    "
                  >

                    <h2 style="
                      margin: 0 0 12px 0;
                      font-size: 29px;
                      line-height: 1.4;
                      font-weight: 900;
                      color: #ffffff;
                    ">
                      Message
                    </h2>

                    <p style="
                      margin: 0;
                      font-size: 25px;
                      line-height: 1.6;
                      font-weight: 700;
                      color: #ffffff;
                      overflow-wrap: anywhere;
                      text-align: center;
                    ">
                      ${safeMessage}
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Website Enquiry: ${inquiryType}`,
      html,
      text: `
NACE NETHERLANDS
nace-netherlands.org

Name: ${name}
Email: ${email}
Inquiry Type: ${inquiryType}

Message:
${plainMessage}
      `.trim()
    })

    if (error) {
      console.error('Resend email error:', error)

      return {
        success: false,
        error: 'Unable to send your message. Please try again.'
      }
    }

    console.log('NACE contact email sent successfully:', data?.id)

    return {
      success: true
    }

  } catch (error) {
    console.error('Contact form error:', error)

    return {
      success: false,
      error: 'A connection error occurred. Please try again.'
    }
  }
}
