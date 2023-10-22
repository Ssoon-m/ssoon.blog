import Link from 'next/link';

interface MobileMenuProps {
  onClickLink: (closeMenu: boolean) => void;
  menuList: Array<{ path: string; title: string; link: string }>;
  currentPathName: string;
}

const MobileMenu = ({
  menuList,
  onClickLink,
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
    <nav className="p-4 z-50 w-full h-full fixed top-[61px] left-0 right-0 bottom-0 bg-white dark:bg-zinc-950">
      <ul onClick={handleLinkClick}>
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
      </ul>
    </nav>
  );
};

export default MobileMenu;
