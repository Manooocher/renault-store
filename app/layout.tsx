import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import localFont from 'next/font/local';

// Load Vazir font locally
const vazir = localFont({
  src: [
    {
      path: '../public/fonts/Vazir.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazir-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  title: 'فروشگاه قطعات رنو | Renault Store',
  description: 'فروشگاه آنلاین قطعات یدکی خودروهای رنو',
  metadataBase: new URL('https://renault-store.ir'),
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://renault-store.ir',
    title: 'فروشگاه قطعات رنو | Renault Store',
    description: 'فروشگاه آنلاین قطعات یدکی خودروهای رنو',
    siteName: 'Renault Store',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-vazir min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}