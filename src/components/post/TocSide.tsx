'use client';
import { cn } from '@/lib/cn';
import { type Toc } from '@/lib/types/toc-type';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const numberToStringMap = {
  1: 'one',
  2: 'two',
  3: 'three',
};

const getScrollTop = () => {
  if (!document.body) return 0;
  if (document.documentElement && 'scrollTop' in document.documentElement) {
    return document.documentElement.scrollTop || document.body.scrollTop;
  } else {
    return document.body.scrollTop;
  }
};

interface IHeadingTops {
  slug: string;
  top: number;
}

interface TocSideProps {
  tableOfContents: Toc[];
}

const TocSide = ({ tableOfContents }: TocSideProps) => {
  const [activeToc, setActiveToc] = useState('');
  const [headingTops, setHeadingTops] = useState<null | IHeadingTops[]>([]);

  const settingHeadingTops = useCallback(() => {
    const scrollTop = getScrollTop();
    const headingTops = tableOfContents.map(({ slug }) => {
      const el = document.getElementById(slug);
      const top = el ? el.getBoundingClientRect().top + scrollTop : 0;
      return { slug, top };
    });
    setHeadingTops(headingTops);
  }, [tableOfContents]);

  useEffect(() => {
    settingHeadingTops();
    let prevScrollHeight = document.body.scrollHeight;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const trackScrollHeight = () => {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        settingHeadingTops();
      }
      prevScrollHeight = scrollHeight;
      timeoutId = setTimeout(trackScrollHeight, 250);
    };

    timeoutId = setTimeout(trackScrollHeight, 250);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [settingHeadingTops]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop();
      if (!headingTops) return;
      const currentHeading = headingTops
        .slice()
        .reverse()
        .find((headingTop) => scrollTop >= headingTop.top - 4);

      if (currentHeading) {
        setActiveToc(currentHeading.slug);
      } else {
        setActiveToc('');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headingTops]);

  return (
    <>
      {tableOfContents.length ? (
        <ul className="pl-2 pr-1">
          <div className="text-lg font-medium dark:border-gray-700 pb-1">
            In this article
          </div>
          {tableOfContents.map((toc, i) => (
            <li
              data-level={numberToStringMap[toc.level]}
              key={i}
              className={cn(
                'pl-2 border-l-2 boder-gray-100 first-of-type:pt-2 py-1 text-gray-400 text-sm hover:text-gray-800 dark:hover:text-gray-200 transition-all',
                'data-[level=two]:pl-4 data-[level=three]:pl-6',
                {
                  'border-indigo-500 text-indigo-500 dark:text-indigo-400 font-bold':
                    activeToc === toc.slug,
                },
              )}
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
