import Link from 'next/link';

interface DesktopHeaderMenuProps {
  menuList: Array<{ path: string; title: string; link: string }>;
  currentPathName: string;
}

const DesktopMenu = ({ menuList, currentPathName }: DesktopHeaderMenuProps) => {
  const isActiveMenu = (path: string) => {
    if (currentPathName === '/') return false;
    return currentPathName.startsWith(path);
  };
  return (
    <nav>
      <ul className="flex items-center gap-1">
        {menuList.map((menu) => (
          <li key={menu.title}>
            <Link
              href={menu.link}
              className={`relative rounded-xl px-4 py-2.5 font-medium text-sm transition-all duration-300 ease-out select-none group overflow-hidden ${
                isActiveMenu(menu.path)
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <span className="relative z-10">{menu.title}</span>
              {!isActiveMenu(menu.path) && (
                <>
                  <div className="absolute inset-0 glass-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
