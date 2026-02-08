import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const LEADS_FILE = path.join(process.cwd(), 'leads.json');

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

    // Read existing leads or start fresh
    let leads: any[] = [];
    try {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      leads = JSON.parse(data);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

    console.log('[Analyzer Lead]', lead);

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      try {
        // Notify Brad
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

        // Send confirmation to user (only works after domain verification)
        if (process.env.RESEND_DOMAIN_VERIFIED === 'true') {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: email,
          subject: 'Your THOR Portfolio Risk Analysis',
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a365d;">Thanks for using the THOR Portfolio Analyzer, ${name}!</h2>
            <p>We've received your portfolio analysis request. Here's a quick summary:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Current Risk Score</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${currentRiskScore}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Optimized Risk Score</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${optimizedRiskScore}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Recommended THOR Allocation</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">${thorAllocation}%</td></tr>
            </table>
            <p>A member of our team will follow up with your detailed report shortly.</p>
            <p>In the meantime, learn more about our approach:</p>
            <ul>
              <li><a href="https://thorfunds.com/funds/thir" style="color: #d69e2e;">THOR SDQ Index Rotation ETF</a></li>
              <li><a href="https://thorfunds.com/funds/thlv" style="color: #d69e2e;">THOR Equal Weight Low Volatility ETF</a></li>
            </ul>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="font-size: 12px; color: #9ca3af;">THOR Financial Technologies, LLC | welcome@thoranalytics.com<br/>
            Past performance does not guarantee future results. This is not investment advice.</p>
          </div>`,
          });
        }
      } catch (emailErr) {
        console.error('[Resend Email Error]', emailErr);
      }
    }

    return NextResponse.json({ success: true, message: `We'll prepare your personalized report and send it to ${email} shortly.` });
  } catch (error) {
    console.error('[Analyzer Lead Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to process lead' }, { status: 500 });
  }
}
