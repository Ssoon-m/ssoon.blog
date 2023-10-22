import Footer from './Footer';
import Header from './Header';

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col w-full mx-auto max-w-3xl lg:max-w-6xl min-h-full px-5">
        <main className="pt-[61px] flex-1 flex flex-col h-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
