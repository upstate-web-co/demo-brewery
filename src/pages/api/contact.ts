import type { APIContext } from 'astro'
import { SITE } from '../../lib/config'

const SUBJECT_MAP: Record<string, string> = {
  general: 'General Inquiry',
  'private-events': 'Private Event Space',
  'furnace-sessions': 'Furnace Sessions Booking',
  press: 'Press / Media',
}

export async function POST({ request, redirect }: APIContext) {
  try {
    const form = await request.formData()

    // Honeypot — if filled, a bot submitted this
    const honeypot = form.get('website')
    if (honeypot) {
      return redirect('/contact?sent=true', 303)
    }

    const name = (form.get('name') as string || '').trim()
    const email = (form.get('email') as string || '').trim()
    const phone = (form.get('phone') as string || '').trim()
    const subject = (form.get('subject') as string || '').trim()
    const message = (form.get('message') as string || '').trim()

    // Server-side validation
    const errors: string[] = []
    if (!name || name.length < 2) errors.push('Name is required.')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.')
    if (!subject || !SUBJECT_MAP[subject]) errors.push('Please select a subject.')
    if (!message || message.length < 10) errors.push('Message must be at least 10 characters.')
    if (name.length > 200 || email.length > 200 || message.length > 5000) errors.push('Input exceeds maximum length.')

    if (errors.length > 0) {
      return redirect(`/contact?error=${encodeURIComponent(errors[0])}`, 303)
    }

    const subjectLabel = SUBJECT_MAP[subject]

    // Get Resend API key from environment
    const env = (import.meta as Record<string, unknown>).env as Record<string, string> | undefined
    const resendKey = env?.RESEND_API_KEY

    if (!resendKey) {
      console.error('RESEND_API_KEY not configured')
      return redirect('/contact?error=Service+temporarily+unavailable.+Please+call+us.', 303)
    }

    // Send via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Clinker Website <noreply@${new URL(SITE.url).hostname}>`,
        to: [SITE.email],
        reply_to: email,
        subject: `[${subjectLabel}] Message from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          `Subject: ${subjectLabel}`,
          '',
          'Message:',
          message,
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('Resend error:', res.status, body)
      return redirect('/contact?error=Failed+to+send.+Please+try+again+or+call+us.', 303)
    }

    return redirect('/contact?sent=true', 303)
  } catch (err) {
    console.error('Contact form error:', err)
    return redirect('/contact?error=Something+went+wrong.+Please+call+us.', 303)
  }
}
