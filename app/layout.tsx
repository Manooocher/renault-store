import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import localFont from 'next/font/local';

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
  title: 'فروشگاه قطعات رنو | Renault Parts Store',
  description: 'فروشگاه آنلاین قطعات یدکی خودروهای رنو با ارسال سریع و تضمین اصالت کالا',
  keywords: 'قطعات رنو, لوازم یدکی رنو, Renault parts, L90, Megane',
  openGraph: {
    title: 'فروشگاه قطعات رنو | Renault Parts Store',
    description: 'فروشگاه آنلاین قطعات یدکی خودروهای رنو با ارسال سریع و تضمین اصالت کالا',
    url: 'https://renault-parts.com',
    siteName: 'Renault Parts Store',
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}