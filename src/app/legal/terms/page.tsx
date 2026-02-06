import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using the THOR Funds website.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-navy-800 py-12">
        <div className="container-wide">
          <h1 className="text-3xl font-bold text-white">Terms of Use</h1>
          <p className="mt-2 text-gray-300">Last updated: January 2024</p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using this website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2>Use of Website</h2>
          <p>
            The content on this website is for informational purposes only and does not constitute investment advice, an offer to sell, or a solicitation of an offer to buy any security. Information on this website should not be relied upon as the basis for making any investment decisions.
          </p>

          <h2>Not Investment Advice</h2>
          <p>
            The information provided on this website is not intended to be, nor should it be construed as, investment advice. You should consult with a qualified financial advisor before making any investment decisions. Past performance is not indicative of future results.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The content on this website, including but not limited to text, graphics, logos, images, and software, is the property of THOR Financial Technologies, LLC and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.
          </p>

          <h2>Links to Third-Party Sites</h2>
          <p>
            This website may contain links to third-party websites. These links are provided for your convenience only. We do not endorse or make any representations about third-party websites, and we are not responsible for their content or privacy practices.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall THOR Financial Technologies, LLC be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your access to, or use of, this website.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless THOR Financial Technologies, LLC and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of your use of this website or violation of these Terms of Use.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at info@thorft.com.
          </p>
        </div>
      </article>
    </>
  );
}
