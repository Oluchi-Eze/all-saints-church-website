
'use server'

import { Resend } from 'resend'

export async function sendEmail(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const inquiryType = String(
    formData.get('inquiry_type') || 'General Inquiry'
  ).trim()

  // Validate required fields
  if (!name || !email || !message) {
    return {
      success: false,
      error: 'Please fill in all required fields.'
    }
  }

  // Validate input lengths
  if (name.length > 120 || email.length > 254 || message.length > 10000) {
    return {
      success: false,
      error: 'One or more fields exceed the allowed length.'
    }
  }

  // Validate email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: 'Please enter a valid email address.'
    }
  }

  // Escape user input before inserting it into HTML
  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }
      return entities[char]
    })

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
  const safeInquiryType = escapeHtml(inquiryType)

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail = process.env.RESEND_TO_EMAIL

  if (!apiKey || !fromEmail || !toEmail) {
    console.error('Missing Resend environment variables.')

    return {
      success: false,
      error: 'Email service is not properly configured. Please try again later.'
    }
  }

  try {
    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Website Inquiry: ${name}`,
      text: `
New Contact Form Submission
NACE Netherlands

Name: ${name}
Email: ${email}
Inquiry Type: ${inquiryType}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #1e293b;">

          <div style="background: #172554; padding: 25px; border-radius: 12px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">NACE Netherlands</h2>
            <p style="color: #bfdbfe; margin-bottom: 0;">New Website Contact Message</p>
          </div>

          <div style="padding: 25px 5px;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Inquiry Type:</strong> ${safeInquiryType}</p>

            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />

            <h3 style="color: #172554;">Message</h3>
            <p style="line-height: 1.7;">${safeMessage}</p>
          </div>

          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="font-size: 12px; color: #64748b; margin: 0;">
              Sent through the NACE Netherlands official website.
            </p>
          </div>

        </div>
      `
    })

    if (error) {
      console.error('Resend error:', error)

      return {
        success: false,
        error: 'Unable to send your message. Please try again later.'
      }
    }

    return {
      success: true,
      data
    }

  } catch (err) {
    console.error('Server action error:', err)

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    }
  }
}
