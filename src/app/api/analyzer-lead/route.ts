import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, currentRiskScore, optimizedRiskScore, thorAllocation } = body;

    // Log the lead (in production, save to database or CRM)
    console.log('[Analyzer Lead]', { name, email, currentRiskScore, optimizedRiskScore, thorAllocation, timestamp: new Date().toISOString() });

    // For MVP: send notification email via simple fetch
    // In production, integrate with email service (SendGrid, etc.)
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analyzer Lead Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to process lead' }, { status: 500 });
  }
}
