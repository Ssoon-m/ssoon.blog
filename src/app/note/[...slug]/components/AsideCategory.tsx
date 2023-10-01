'use client';
import type { TreeView } from '../types/aside-type';
import CategoryItem from './CategoryItem';

interface AsideCategoryProps {
  categories: TreeView[];
  currentPath: string;
}

const AsideCategory = ({ categories, currentPath }: AsideCategoryProps) => {
  return (
    <aside className="w-full">
      <ul>
        {categories.map((category, i) => (
          <CategoryItem
            key={i}
            category={category}
            isExpanded={currentPath.startsWith(category.url)}
            currentPath={currentPath}
          />
        ))}
      </ul>
    </aside>
  );
};

export default AsideCategory;
