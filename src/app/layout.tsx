import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { pretendard } from '@/lib/fonts';
import { siteSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import '../styles/globals.css';
import AppProviders from './AppProviders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pretendard.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-zinc-950 transition-[background]">
        <AppProviders>
          <section className="pt-14 w-full h-full flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 flex flex-col w-full mx-auto max-w-3xl lg:max-w-6xl min-h-full px-5">
              <main className="flex-1 flex flex-col h-full">{children}</main>
            </div>
            <Footer />
          </section>
        </AppProviders>
      </body>
    </html>
  );
}

export const metadata: Metadata = siteSEO();
