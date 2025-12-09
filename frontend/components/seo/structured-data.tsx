export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Code2Cash",
    "url": "https://code2cash.in",
    "logo": "https://www.code2cash.in/logo-final.png",
    "description": "Code2Cash is a digital service company providing web development, app development, SEO, and custom software solutions.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://www.linkedin.com/company/code2cash",
      "https://twitter.com/code2cash",
      "https://www.facebook.com/code2cash"
    ],
    "services": [
      "Web Development",
      "App Development",
      "SEO Services",
      "Software Development",
      "UI/UX Design",
      "Digital Solutions"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
