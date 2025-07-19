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
      className="p-4 z-40 w-full h-full fixed top-[61px] left-0 right-0 bottom-0 glass-heavy backdrop-blur-2xl"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={fullSlideInMenu}
    >
      <motion.ul
        className="pt-14"
        onClick={handleLinkClick}
        variants={fadeInSlideUpDelay}
      >
        {menuList.map((menu, index) => (
          <motion.li
            key={menu.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          >
            <Link
              href={menu.link}
              className={`relative flex text-xl rounded-xl p-4 mb-2 transition-all duration-300 ease-out select-none group overflow-hidden ${
                isActiveMenu(menu.path)
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50'
                  : 'text-gray-600 dark:text-gray-300 border border-transparent'
              }`}
            >
              <span className="relative z-10">{menu.title}</span>
              {!isActiveMenu(menu.path) && (
                <>
                  <div className="absolute inset-0 glass-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </>
              )}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default MobileMenu;
