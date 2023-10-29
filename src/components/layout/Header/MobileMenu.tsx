'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fullSlideInMenu, fadeInSlideUpDelay } from '@/constants/animation';

interface MobileMenuProps {
  onClickLink: (closeMenu: boolean) => void;
  isOpen: boolean;
  menuList: Array<{ path: string; title: string; link: string }>;
  currentPathName: string;
}

const MobileMenu = ({
  menuList,
  onClickLink,
  isOpen,
  currentPathName,
}: MobileMenuProps) => {
  const handleLinkClick = () => {
    onClickLink(false);
  };
  const isActiveMenu = (path: string) => {
    if (currentPathName === '/') return false;
    return currentPathName.startsWith(path);
  };
  return (
    <motion.nav
      className="p-4 z-40 w-full h-full fixed top-[61px] left-0 right-0 bottom-0 bg-white dark:bg-zinc-950"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={fullSlideInMenu}
    >
      <motion.ul
        className="pt-14"
        onClick={handleLinkClick}
        variants={fadeInSlideUpDelay}
      >
        {menuList.map((menu) => (
          <li key={menu.title}>
            <Link
              href={menu.link}
              className={`flex text-xl rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none ${
                isActiveMenu(menu.path)
                  ? 'text-indigo-500'
                  : 'text-gray-500 dark:text-gray-300'
              }`}
            >
              {menu.title}
            </Link>
          </li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default MobileMenu;
