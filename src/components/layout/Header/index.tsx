'use client';
import MenuButton from '@/components/common/MenuButton';
import { headerNavLinks } from '@/constants/header-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ToggleTheme from '../../ToggleTheme';
import DesktopHeaderMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const onClickMenuButton = () => {
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
  const onClickLink = (closeMenu: boolean) => {
    setIsOpen(closeMenu);
    document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
  };
  return (
    <>
      <header className="w-full px-4 py-3 fixed top-0 z-10 bg-white/80 backdrop-blur-sm backdrop-saturate-200 dark:bg-black/50 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold rounded-lg sm:block text-gray-800  dark:text-white transition">
                  SSoon
                </div>
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
              <MenuButton isOpen={isOpen} onClickMenu={onClickMenuButton} />
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
