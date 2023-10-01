'use client';
import { useState } from 'react';
import type { TreeView } from '../types/aside-type';
import CategoryItem from './CategoryItem';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';

interface TopNavCategoryProps {
  categories: TreeView[];
  currentPath: string;
}

const TopNavCategory = ({ categories, currentPath }: TopNavCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenTopNav = () => {
    if (isOpen) {
      setIsOpen(false);
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
      return;
    }
    if (!isOpen) {
      setIsOpen(true);
      document.body.classList.add('overflow-hidden', 'md:overflow-auto');
      return;
    }
  };

  return (
    <div
      className={`z-10 w-full fixed top-[57px] left-0 right-0 backdrop-blur-sm backdrop-saturate-200 dark:bg-black/50 ${
        isOpen
          ? 'bg-white dark:bg-zinc-950 bottom-0 overflow-y-auto'
          : 'bg-white/80'
      }`}
    >
      <div
        onClick={handleOpenTopNav}
        className="text-gray-500 dark:text-gray-300 w-full px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-1"
      >
        <ChevronRightIcon
          className={`${
            isOpen ? 'rotate-90' : 'rotate-0'
          } transition-transform duration-200`}
        />
        노트 목록
      </div>
      {isOpen && (
        <nav className="px-3 py-2 w-full bg-white dark:bg-zinc-950">
          <ul className="bg-inherit">
            {categories.map((category, i) => (
              <CategoryItem
                key={i}
                category={category}
                isExpanded={currentPath.startsWith(category.url)}
                currentPath={currentPath}
              />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TopNavCategory;
