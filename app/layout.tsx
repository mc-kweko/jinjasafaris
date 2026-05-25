import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jinja Safaris - Hub of the Nile Tourism',
  description: 'Experience the best of Uganda with Jinja Safaris. White water rafting, skydiving, Nile tubing, trekking, and bird watching since 2014.',
  keywords: 'Jinja, Uganda, safaris, white water rafting, skydiving, Nile, tourism, adventure',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Jinja Safaris - Hub of the Nile Tourism',
    description: 'Experience the best of Uganda with Jinja Safaris',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jinjasafaris.example.com';
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jinja Safaris",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "sameAs": [
      "https://instagram.com/jinjasafaris",
      "https://twitter.com/jinjasafaris"
    ]
  };
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="robots" content="index, follow" />
        <script key="ld+json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className}>
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
