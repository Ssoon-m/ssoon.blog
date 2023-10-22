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
      <ul className="flex">
        {menuList.map((menu) => (
          <li key={menu.title}>
            <Link
              href={menu.link}
              className={`rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none ${
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

export default DesktopMenu;
