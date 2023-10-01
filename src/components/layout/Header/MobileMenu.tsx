import Link from 'next/link';

interface MobileMenuProps {
  onClickLink: (closeMenu: boolean) => void;
  menuList: Array<{ path: string; title: string }>;
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
    return path.startsWith(currentPathName);
  };
  return (
    <nav className="z-50 w-full h-full fixed top-[61px] left-0 right-0 bottom-0 bg-white">
      <div className="p-4">
        <div className="flex flex-col gap-2" onClick={handleLinkClick}>
          {menuList.map((menu) => (
            <Link
              key={menu.title}
              href={menu.path}
              className={`w-full text-xl rounded-lg px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none ${
                isActiveMenu(menu.path) ? 'text-indigo-500' : ''
              }`}
            >
              {menu.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;
