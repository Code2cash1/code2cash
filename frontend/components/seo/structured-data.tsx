export default function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Code2Cash",
    "alternateName": "Code2Cash Web Solutions",
    "url": "https://www.code2cash.in",
    "logo": "https://www.code2cash.in/logo-final.png",
    "description": "Code2Cash is a leading MSME-registered web development agency in India offering custom website design, mobile app development, and digital solutions. Government verified with UDYAM registration.",
    "foundingDate": "2024",
    "email": "support@code2cash.in",
    "telephone": "+91-70618-38495",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Bihar"
    },
    "sameAs": [
      "https://www.instagram.com/code2cash_co/",
      "https://www.linkedin.com/company/code2cash"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-70618-38495",
      "contactType": "Customer Service",
      "email": "support@code2cash.in",
      "availableLanguage": ["English", "Hindi"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Code2Cash",
    "url": "https://www.code2cash.in",
    "description": "Professional web development agency offering custom websites, mobile apps, and digital solutions",
    "publisher": {
      "@type": "Organization",
      "name": "Code2Cash"
    }
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "Organization",
      "name": "Code2Cash",
      "telephone": "+91-70618-38495",
      "email": "support@code2cash.in"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Professional custom website design and development services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "iOS and Android mobile application development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Commerce Solutions",
            "description": "Complete e-commerce website development and management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design",
            "description": "User interface and user experience design services"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
