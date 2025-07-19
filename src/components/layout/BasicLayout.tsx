'use client';
import Footer from './Footer';
import Header from './Header';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import { usePathname } from 'next/navigation';

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const pathname = usePathname();
  const isBlogPost = /^\/blog\//.test(pathname);

  return (
    <div className="w-full h-full flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {isBlogPost && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 w-full">
          <ScrollProgressBar />
        </div>
      )}
      <Header />
      <div className="flex-1 flex flex-col w-full mx-auto max-w-3xl lg:max-w-6xl min-h-full px-5 relative">
        <main className="pt-[61px] flex-1 flex flex-col h-full relative z-10">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
