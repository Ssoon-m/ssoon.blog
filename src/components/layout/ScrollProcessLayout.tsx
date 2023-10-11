import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollProgressBar from '../ScrollProgressBar';

interface ScrollProcessLayoutProps {
  children: React.ReactNode;
}

const ScrollProcessLayout = ({ children }: ScrollProcessLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col min-h-screen">
      <div className="fixed top-0 z-10 h-1 w-full">
        <ScrollProgressBar />
      </div>
      <div className="fixed top-1 z-10 w-full">
        <Header />
      </div>
      <div className="flex-1 flex flex-col w-full mx-auto max-w-3xl lg:max-w-6xl min-h-full px-5">
        <main className="pt-[61px] flex-1 flex flex-col h-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ScrollProcessLayout;
