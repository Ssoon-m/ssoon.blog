import { pretendard } from '@/lib/fonts';
import { defaultSEO } from '@/lib/seo';
import type { Metadata } from 'next';
import '../styles/globals.css';
import AppProviders from './AppProviders';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pretendard.className} suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="t4yGo31cnDw9HJp_tt53U8wpVjIM7LXQjYYIBz5aClY"
        />
        <meta
          name="naver-site-verification"
          content="3b7e7ef03951c66c69bd0d552ab9561f452e8a8b"
        />
      </head>
      <body className="bg-white dark:bg-zinc-950 transition-[background]">
        <GoogleAnalytics />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

export const metadata: Metadata = defaultSEO();
