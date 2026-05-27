import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jinjasafaris.com'),
  title: {
    default: 'Jinja Safaris - Hub of the Nile Tourism',
    template: '%s | Jinja Safaris',
  },
  description: 'Jinja Safaris offers white water rafting, skydiving, Nile tubing, trekking, bird watching, partner hotels, and tour bookings in Jinja, Uganda.',
  keywords: [
    'Jinja Safaris',
    'Jinja tourism',
    'Uganda safaris',
    'white water rafting Jinja',
    'skydiving Uganda',
    'Nile tubing',
    'Nile tourism',
    'Jinja adventure tours',
    'book safari Jinja',
  ],
  applicationName: 'Jinja Safaris',
  authors: [{ name: 'Jinja Safaris' }],
  creator: 'Jinja Safaris',
  publisher: 'Jinja Safaris',
  category: 'travel',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: 'large',
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Jinja Safaris - Hub of the Nile Tourism',
    description: 'Explore adventures, hotels, and safari bookings in Jinja, Uganda.',
    type: 'website',
    url: '/',
    siteName: 'Jinja Safaris',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'Jinja Safaris logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jinja Safaris - Hub of the Nile Tourism',
    description: 'Explore adventures, hotels, and safari bookings in Jinja, Uganda.',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jinjasafaris.com';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Jinja Safaris",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "image": `${siteUrl}/images/logo.png`,
    "telephone": "+256123456789",
    "email": "info@jinjasafaris.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rubaga Hill",
      "addressLocality": "Jinja City",
      "addressRegion": "Eastern Uganda",
      "addressCountry": "UG"
    },
    "sameAs": [
      "https://instagram.com/jinjasafaris",
      "https://twitter.com/jinjasafaris",
      "https://tiktok.com/@jinjasafaris"
    ]
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          key="ld+json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
