import Link from 'next/link';

interface DesktopHeaderMenuProps {
  menuList: Array<{ path: string; title: string }>;
  currentPathName: string;
}

const DesktopMenu = ({ menuList, currentPathName }: DesktopHeaderMenuProps) => {
  const isActiveMenu = (path: string) => {
    if (currentPathName === '/') return false;
    return path.startsWith(currentPathName);
  };
  return (
    <nav>
      <div>
        {menuList.map((menu) => (
          <Link
            key={menu.title}
            href={menu.path}
            className={`rounded-lg px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none ${
              isActiveMenu(menu.path) ? 'text-indigo-500' : ''
            }`}
          >
            {menu.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DesktopMenu;
