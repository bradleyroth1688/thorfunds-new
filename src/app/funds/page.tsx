"use client";

import { useState } from "react";
import Link from "next/link";

function RedirectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 text-center">
        <div className="text-4xl mb-4">🔗</div>
        <h3 className="text-xl font-bold text-navy-800 mb-3">You Are Leaving This Site</h3>
        <p className="text-gray-600 mb-6">
          You are being redirected away from THOR Financial Technologies and directed to THOR Funds, a separate entity. THOR Financial Technologies is not responsible for the content on the THOR Funds website.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <a
            href="https://thorfunds.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg bg-navy-800 text-white hover:bg-navy-700 font-medium"
          >
            Continue to THOR Funds
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FundsPage() {
  const [showRedirect, setShowRedirect] = useState(false);

  return (
    <>
      <RedirectModal open={showRedirect} onClose={() => setShowRedirect(false)} />

      {/* Hero */}
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">THOR Funds</h1>
            <p className="mt-4 text-xl text-gray-300">
              Active ETFs powered by THOR Financial Technologies&apos; proprietary signal processing and systematic risk management.
            </p>
          </div>
        </div>
      </section>

      {/* Fund Cards */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* THIR Card */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
              <div className="bg-navy-800 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gold-500">THIR</span>
                  <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium">
                    Index Rotation
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">THOR SDQ Index Rotation ETF</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-navy-800">Actively Managed ETF</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expense Ratio</span>
                    <span className="font-medium text-navy-800">0.70%</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setShowRedirect(true)}
                    className="block w-full text-center btn-primary cursor-pointer"
                  >
                    Full Details at thorfunds.com →
                  </button>
                </div>
              </div>
            </div>

            {/* THLV Card */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden">
              <div className="bg-navy-800 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gold-500">THLV</span>
                  <span className="bg-gold-500 text-navy-900 px-3 py-1 rounded text-sm font-medium">
                    Low Volatility
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-semibold text-white">THOR Equal Weight Low Volatility ETF</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-navy-800">Actively Managed ETF</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expense Ratio</span>
                    <span className="font-medium text-navy-800">0.64%</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setShowRedirect(true)}
                    className="block w-full text-center btn-primary cursor-pointer"
                  >
                    Full Details at thorfunds.com →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <p className="text-sm text-gray-500 leading-relaxed">
            An investor should consider the investment objectives, risks, charges, and expenses of the Fund carefully before investing. All investments are subject to risks, including the possible loss of principal. ETFs trade like stocks, are subject to investment risk, fluctuate in market value and may trade at prices above or below the ETF&apos;s net asset value. For full fund details, prospectus, and performance information, visit{" "}
            <button
              onClick={() => setShowRedirect(true)}
              className="text-gold-600 hover:underline cursor-pointer"
            >
              thorfunds.com
            </button>
            .
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-navy-800">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white">Questions About THOR Funds?</h2>
          <div className="mt-8">
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-navy-800">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
