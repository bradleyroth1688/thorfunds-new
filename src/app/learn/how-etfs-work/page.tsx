import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How ETFs Work",
  description: "Understand the mechanics of ETFs including creation/redemption, market making, and tax efficiency.",
};

export default function HowETFsWorkPage() {
  return (
    <>
      <section className="bg-navy-800 py-12 lg:py-16">
        <div className="container-wide">
          <nav className="flex items-center text-sm text-gray-400 mb-4">
            <Link href="/learn" className="hover:text-gold-500">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-white">How ETFs Work</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">How ETFs Work</h1>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>The Creation/Redemption Mechanism</h2>
          <p>
            Unlike mutual funds where investors buy and sell directly with the fund company, ETF shares are created and redeemed through a unique process involving authorized participants (APs).
          </p>
          <p>
            When demand for ETF shares rises, APs can create new shares by delivering a basket of the underlying securities to the fund. When demand falls, they can redeem shares by receiving the underlying securities back. This mechanism keeps ETF prices closely aligned with their net asset value (NAV).
          </p>

          <h2>Trading on Exchanges</h2>
          <p>
            ETF shares trade throughout the day on stock exchanges, just like individual stocks. This means you can buy or sell shares at any time during market hours at the current market price—a significant advantage over mutual funds, which only price once at the end of each trading day.
          </p>

          <h2>Tax Efficiency</h2>
          <p>
            The creation/redemption process gives ETFs a structural tax advantage. When mutual funds sell securities to meet redemptions, they often generate capital gains that are passed on to all shareholders. ETFs can typically avoid this by using &quot;in-kind&quot; transfers with authorized participants.
          </p>

          <h2>Premiums and Discounts</h2>
          <p>
            While the creation/redemption mechanism keeps ETF prices near NAV, small premiums (trading above NAV) or discounts (trading below NAV) can occur due to supply and demand. These are usually minimal for liquid ETFs but can be larger for less liquid or complex products.
          </p>

          <div className="bg-navy-50 rounded-xl p-8 my-8 not-prose">
            <h3 className="text-xl font-semibold text-navy-800 mb-4">Explore THOR&apos;s ETFs</h3>
            <Link href="/funds" className="btn-primary">View Our ETFs</Link>
          </div>

          <h2>Related Reading</h2>
          <ul>
            <li><Link href="/learn/what-is-an-etf">What is an ETF?</Link></li>
            <li><Link href="/learn/index-rotation-explained">Index Rotation Explained</Link></li>
          </ul>
        </div>
      </article>
    </>
  );
}
