import { Metadata } from 'next';
import Script from 'next/script';
import AnalyzerWizard from './components/AnalyzerWizard';

export const metadata: Metadata = {
  title: 'Portfolio Analyzer | THOR Funds',
  description: 'Analyze your portfolio risk and see how THOR ETFs can improve your risk-adjusted returns.',
};

export default function AnalyzePage() {
  return (
    <>
      {/* Load pdf.js for statement parsing */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        strategy="lazyOnload"
      />

      {/* Hero */}
      <section className="bg-navy-800 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Portfolio Analyzer
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              See how THOR ETFs can improve your risk-adjusted returns
            </p>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <AnalyzerWizard />
        </div>
      </section>
    </>
  );
}
