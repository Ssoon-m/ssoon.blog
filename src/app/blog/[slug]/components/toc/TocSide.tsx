'use client';
import { type Toc } from '@/lib/types/toc-type';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface TocSideProps {
  tableOfContents: Toc[];
}

const TocSide = ({ tableOfContents }: TocSideProps) => {
  const observer = useRef<IntersectionObserver>();
  const [activeToc, setActiveToc] = useState('');

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveToc(entry.target.id);
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.5,
      },
    );
    const headingElements = document.querySelectorAll('.prose h1,h2,h3');
    headingElements.forEach((element) => observer.current?.observe(element));
    return () => observer.current?.disconnect();
  }, []);

  return (
    <>
      {tableOfContents.length ? (
        <ul className="px-1">
          <div className="text-lg font-medium border-b border-gray-100 dark:border-gray-700 pb-1">
            목차
          </div>
          {tableOfContents.map((toc, i) => (
            <li
              data-level={toc.level}
              key={i}
              className={`first-of-type:pt-2 py-1 data-[level=two]:pl-3 data-[level=three]:pl-5 text-gray-400 text-sm hover:text-gray-800 dark:hover:text-gray-200 transition-all ${
                activeToc === toc.slug
                  ? 'scale-105 text-gray-700 dark:text-gray-200'
                  : 'mt-0 scale-100'
              }`}
            >
              <Link href={`#${toc.slug}`}>{toc.text}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default TocSide;
