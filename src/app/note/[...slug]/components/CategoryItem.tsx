import React, { useState } from 'react';
import { TreeView } from '../types/aside-type';
import Link from 'next/link';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';

interface AsideCategoryProps {
  category: TreeView;
  isExpanded: boolean;
  currentPath: string;
}

const AsideCategoryItem = ({
  category,
  isExpanded = false,
  currentPath,
}: AsideCategoryProps) => {
  const [isOpen, setIsOpen] = useState(isExpanded);

  const handleLinkClick = () => {
    document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
  };

  return (
    <li className="w-fullblock text-gray-800 dark:text-gray-400">
      <div
        className="font-medium p-1 flex gap-1 items-center hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="text-indigo-500">
          <ChevronRightIcon
            width={20}
            height={20}
            className={`${
              isOpen ? 'rotate-90' : 'rotate-0'
            } transition-transform duration-200`}
          />
        </div>
        {category.title}
      </div>
      <div
        className={`${
          isOpen
            ? ' max-h-screen overflow-visible opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        } min-h-0 transition-all duration-300`}
      >
        <div className="flex w-full">
          <div className="w-full">
            <ul className="relative">
              {category.children.map((childCategory, i) => (
                <li className="block" key={i}>
                  <Link
                    onClick={handleLinkClick}
                    href={`/${childCategory.url}`}
                    className={`${
                      currentPath.startsWith(childCategory.url)
                        ? 'before:bg-indigo-500 text-indigo-500 font-medium'
                        : 'before:bg-gray-200 dark:before:bg-gray-800'
                    } hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md relative p-1 pl-9 flex items-center before:content-[''] before:block before:absolute before:left-[13px] before:w-[1px] before:h-full before:z-[1] select-none`}
                  >
                    {childCategory.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default AsideCategoryItem;
