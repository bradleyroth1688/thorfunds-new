import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, holdingsCount, tickers, riskScore, currentRiskScore, optimizedRiskScore, thorAllocation, step } = body;

    const lead = {
      name,
      email,
      company: company || '',
      holdingsCount,
      tickers: tickers || '',
      riskScore,
      currentRiskScore,
      optimizedRiskScore,
      thorAllocation,
      step: step || 'post-optimization',
      timestamp: new Date().toISOString(),
    };

    console.log('[Analyzer Lead]', JSON.stringify(lead));

    const errors: string[] = [];

    // 1. Store in Supabase (leads table)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const sourceMeta = JSON.stringify({
          type: 'analyzer',
          company: lead.company,
          holdingsCount: lead.holdingsCount,
          tickers: lead.tickers,
          riskScore: lead.riskScore,
          currentRiskScore: lead.currentRiskScore,
          optimizedRiskScore: lead.optimizedRiskScore,
          thorAllocation: lead.thorAllocation,
          step: lead.step,
        });
        const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            email: lead.email,
            first_name: lead.name,
            source: sourceMeta,
          }),
        });
        if (!res.ok) {
          const errText = await res.text();
          errors.push(`Supabase: ${res.status} ${errText}`);
          console.error('[Supabase Error]', errText);
        }
      } catch (err) {
        errors.push(`Supabase: ${err}`);
        console.error('[Supabase Error]', err);
      }
    }

    // 2. Notify via Telegram bot
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || '6649863216';
    if (botToken) {
      try {
        const msg = `🎯 *New Analyzer Lead*\n\n` +
          `*Name:* ${name}\n` +
          `*Email:* ${email}\n` +
          (company ? `*Company:* ${company}\n` : '') +
          `*Holdings:* ${holdingsCount || '?'} positions\n` +
          (riskScore ? `*Risk Score:* ${riskScore}\n` : '') +
          (currentRiskScore ? `*Current Risk:* ${currentRiskScore}\n` : '') +
          (optimizedRiskScore ? `*Optimized Risk:* ${optimizedRiskScore}\n` : '') +
          (thorAllocation ? `*THOR Allocation:* ${thorAllocation}%\n` : '') +
          `*Step:* ${step || 'unknown'}\n` +
          `*Time:* ${lead.timestamp}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: msg,
            parse_mode: 'Markdown',
          }),
        });
      } catch (err) {
        errors.push(`Telegram: ${err}`);
        console.error('[Telegram Error]', err);
      }
    }

    // 3. Send email via Resend (keep as backup)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        const fromAddr = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        await resend.emails.send({
          from: fromAddr,
          to: 'broth@thoranalytics.com',
          subject: `New Analyzer Lead: ${name}${company ? ' (' + company + ')' : ''} — ${email}`,
          html: `<h2>New Portfolio Analyzer Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Holdings:</strong> ${tickers || 'N/A'} (${holdingsCount || '?'} positions)</p>
            <p><strong>Risk Score:</strong> ${riskScore || 'Not provided'}</p>
            ${currentRiskScore ? `<p><strong>Current Risk Score:</strong> ${currentRiskScore}</p>` : ''}
            ${optimizedRiskScore ? `<p><strong>Optimized Risk Score:</strong> ${optimizedRiskScore}</p>` : ''}
            ${thorAllocation ? `<p><strong>THOR Allocation:</strong> ${thorAllocation}%</p>` : ''}
            <p><strong>Step:</strong> ${step || 'unknown'}</p>
            <p><strong>Time:</strong> ${lead.timestamp}</p>`,
        });
      } catch (emailErr) {
        errors.push(`Resend: ${emailErr}`);
        console.error('[Resend Email Error]', emailErr);
      }
    }

    if (errors.length > 0) {
      console.warn('[Lead Notification Errors]', errors);
    }

    return NextResponse.json({ success: true, message: `We'll prepare your personalized report and send it to ${email} shortly.` }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('[Analyzer Lead Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to process lead' }, { status: 500, headers: CORS_HEADERS });
  }
}
