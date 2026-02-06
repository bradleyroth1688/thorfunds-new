import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "THOR Funds privacy policy describing how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy-800 py-12">
        <div className="container-wide">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-2 text-gray-300">Last updated: January 2024</p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-narrow prose-content">
          <h2>Introduction</h2>
          <p>
            THOR Financial Technologies, LLC (&quot;THOR,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect several types of information from and about users of our website, including:</p>
          <ul>
            <li>Personal information you provide directly to us (such as name, email address, phone number, company name)</li>
            <li>Information about your internet connection, the equipment you use to access our website, and usage details</li>
            <li>Information collected through cookies, web beacons, and other tracking technologies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use information that we collect about you or that you provide to us:</p>
          <ul>
            <li>To present our website and its contents to you</li>
            <li>To provide you with information, products, or services that you request from us</li>
            <li>To fulfill any other purpose for which you provide it</li>
            <li>To notify you about changes to our website or any products or services we offer</li>
            <li>For any other purpose with your consent</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>We may disclose personal information that we collect or you provide:</p>
          <ul>
            <li>To our subsidiaries and affiliates</li>
            <li>To contractors, service providers, and other third parties we use to support our business</li>
            <li>To comply with any court order, law, or legal process</li>
            <li>To enforce or apply our terms of use and other agreements</li>
            <li>If we believe disclosure is necessary to protect the rights, property, or safety of THOR, our customers, or others</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website.
          </p>

          <h2>Your Choices</h2>
          <p>
            You may opt out of receiving promotional emails from us by following the instructions in those messages. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
          </p>

          <h2>Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us at: info@thorft.com
          </p>

          <h2>Changes to Our Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. If we make material changes, we will notify you by email or through a notice on this website prior to the change becoming effective.
          </p>
        </div>
      </article>
    </>
  );
}
