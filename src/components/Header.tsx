import Link from "next/link";
import React from "react";

const headerNavLinks = [
  { page: "blog", title: "Blog" },
  { page: "archives", title: "Archives" },
  { page: "about", title: "About" },
];

const Header = () => {
  return (
    <header className="w-full py-3 fixed top-0 z-10 bg-white dark:bg-black backdrop-filter backdrop-blur-lg bg-opacity-80 border-b border-gray-100 dark:border-gray-800 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold rounded-lg sm:block text-gray-800  transition">
                SSoon
              </div>
            </div>
          </Link>
        </div>
        <nav>
          <div>
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={`/${link.page}`}
                className="rounded-lg px-3 py-2 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition select-none"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
