import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // 1. Store lead in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("leads").upsert(
        {
          email,
          source: JSON.stringify({ type: "whitepaper", paper: "signal-processing-101" }),
          created_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );
    }

    // 2. Send email with whitepaper link
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      const fromAddr = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      await resend.emails.send({
        from: fromAddr,
        to: email,
        subject: "Your Copy of Signal Processing 101 — THOR Funds",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1a2332; font-size: 24px; margin-bottom: 16px;">Signal Processing 101</h1>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              Thanks for your interest in how THOR's systematic approach works. Here's your copy of our whitepaper.
            </p>
            <p style="margin: 24px 0;">
              <a href="https://thorfunds.com/documents/signal-processing-101-whitepaper.pdf" 
                 style="display: inline-block; background: #c5a047; color: #1a2332; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Download Signal Processing 101 (PDF)
              </a>
            </p>
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
              Want to learn more about our strategies? Visit <a href="https://thorfunds.com" style="color: #c5a047;">thorfunds.com</a> or subscribe to our daily newsletter <a href="https://thorft.beehiiv.com" style="color: #c5a047;">The Signal</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
            <p style="color: #a0aec0; font-size: 12px;">
              THOR Financial Technologies, LLC | Distributed by PINE Distributors LLC, Member FINRA<br />
              This is not investment advice. Past performance is not indicative of future results.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Whitepaper API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
