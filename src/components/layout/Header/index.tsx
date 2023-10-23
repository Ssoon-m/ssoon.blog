'use client';
import MenuToggleButton from '@/components/common/MenuToggleButton';
import { headerNavLinks } from '@/constants/header-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ToggleTheme from '../../ToggleTheme';
import DesktopHeaderMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import { useGetCurrentTheme } from '@/hooks/useGetCurrentTheme';
import { useIsMounted } from '@/hooks/useIsMounted';
import ScrollProgressBar from '@/components/ScrollProgressBar';

interface HeaderProps {
  isScrollProgressBar?: boolean;
}

const Header = ({ isScrollProgressBar = false }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useGetCurrentTheme();
  const { isMounted } = useIsMounted();
  const pathname = usePathname();
  const onClickMenuToggleButton = () => {
    if (isOpen) {
      setIsOpen(false);
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
      return;
    }
    if (!isOpen) {
      setIsOpen(true);
      document.body.classList.add('overflow-hidden', 'md:overflow-auto');
      return;
    }
  };

  const onClickGoHome = () => {
    setIsOpen(false);
    document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
  };

  const onClickLink = (closeMenu: boolean) => {
    setIsOpen(closeMenu);
    document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
  };

  const isScrollProgressBarClasses = isScrollProgressBar ? 'top-1' : 'top-0';

  return (
    <>
      {isScrollProgressBar && (
        <div className="fixed top-0 z-10 h-1 w-full">
          <ScrollProgressBar />
        </div>
      )}
      <header
        className={`fixed ${isScrollProgressBarClasses} z-10 w-full h-[61px] px-4 py-3 bg-white/80 backdrop-blur-sm backdrop-saturate-200 dark:bg-black/50 border-b border-gray-100 dark:border-gray-700`}
      >
        <div className="relative max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/" onClick={onClickGoHome}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[80px]">
                {isMounted && theme === 'dark' ? (
                  <Image
                    src="/logo/white-logo.png"
                    width={80}
                    height={40}
                    alt="site logo"
                  />
                ) : (
                  <Image
                    src="/logo/black-logo.png"
                    width={80}
                    height={40}
                    alt="site logo"
                  />
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <DesktopHeaderMenu
                menuList={headerNavLinks}
                currentPathName={pathname}
              />
            </div>
            <div className="block md:hidden">
              <MenuToggleButton
                isOpen={isOpen}
                onClickMenu={onClickMenuToggleButton}
              />
            </div>
            <ToggleTheme />
          </div>
        </div>
      </header>
      {isOpen && (
        <div className="block md:hidden">
          <MobileMenu
            menuList={headerNavLinks}
            onClickLink={onClickLink}
            currentPathName={pathname}
          />
        </div>
      )}
    </>
  );
};

export default Header;
