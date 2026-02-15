import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal Processing 101 | THOR Funds",
  description: "How THOR's systematic approach uses signal processing to filter market noise, detect regime changes, and manage portfolio risk.",
  openGraph: {
    title: "Signal Processing 101 | THOR Funds",
    description: "How THOR's systematic approach uses signal processing to filter market noise, detect regime changes, and manage portfolio risk.",
    images: [
      {
        url: "/images/whitepaper-og.png",
        width: 1200,
        height: 600,
        alt: "Signal Processing 101 - THOR Funds Whitepaper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Signal Processing 101 | THOR Funds",
    description: "How THOR's systematic approach uses signal processing to filter market noise, detect regime changes, and manage portfolio risk.",
    images: ["/images/whitepaper-og.png"],
  },
};

export default function WhitePapersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
