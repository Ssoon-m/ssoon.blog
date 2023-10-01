import Link from 'next/link';

interface DesktopHeaderMenuProps {
  menuList: Array<{ path: string; title: string }>;
  currentPathName: string;
}

const DesktopMenu = ({ menuList, currentPathName }: DesktopHeaderMenuProps) => {
  return (
    <nav>
      <div>
        {menuList.map((menu) => (
          <Link
            key={menu.title}
            href={menu.path}
            className={`rounded-lg px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none ${
              menu.path.startsWith(currentPathName) ? 'text-indigo-500' : ''
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
