import { NextResponse } from 'next/server';
import { verifyTurnstile } from '@/lib/turnstile';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!rateLimit(ip, 'contact', 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, type, subject, message, honeypot, turnstileToken } = body || {};

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    // Turnstile verification
    if (!turnstileToken) {
      return NextResponse.json({ error: 'CAPTCHA verification required' }, { status: 400 });
    }
    const turnstileValid = await verifyTurnstile(turnstileToken);
    if (!turnstileValid) {
      return NextResponse.json({ error: 'CAPTCHA verification failed. Please try again.' }, { status: 403 });
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      const fromAddr = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      await resend.emails.send({
        from: fromAddr,
        to: 'broth@thoranalytics.com',
        subject: `New Contact: ${firstName} ${lastName} — ${email}`,
        html: `<h2>New Contact Form Submission (thorfunds.com)</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${type ? `<p><strong>Type:</strong> ${type}</p>` : ''}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <p><strong>Message:</strong> ${message}</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
