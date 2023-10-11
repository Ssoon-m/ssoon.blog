import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { pretendard } from '@/lib/fonts';
import { defaultSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import '../styles/globals.css';
import AppProviders from './AppProviders';
import BasicLayout from '@/components/layout/BasicLayout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pretendard.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-zinc-950 transition-[background]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

export const metadata: Metadata = defaultSEO();
