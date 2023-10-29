'use client';
import { type Toc } from '@/lib/types/toc-type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const settingHeadingTops = () => {
      const scrollTop = getScrollTop();
      const headingTops = tableOfContents.map(({ slug }) => {
        const el = document.getElementById(slug);
        const top = el ? el.getBoundingClientRect().top + scrollTop : 0;
        return { slug, top };
      });
      setHeadingTops(headingTops);
    };

    const trackScrollHeight = () => {
      let prevScrollHeight = document.body.scrollHeight;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      const settingScroll = () => {
        const scrollHeight = document.body.scrollHeight;
        if (prevScrollHeight !== scrollHeight) {
          settingHeadingTops();
        }
        prevScrollHeight = scrollHeight;
        timeoutId = setTimeout(settingScroll, 250);
      };
      timeoutId = setTimeout(settingScroll, 250);
      return timeoutId;
    };

    settingHeadingTops();
    const timeoutId = trackScrollHeight();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tableOfContents]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop();
      if (!headingTops) return;
      const currentHeading = headingTops
        .slice()
        .reverse()
        .find((headingTop) => scrollTop >= headingTop.top - 2);

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
        <ul className="px-1">
          <div className="text-lg font-medium border-b border-gray-100 dark:border-gray-700 pb-1">
            목차
          </div>
          {tableOfContents.map((toc, i) => (
            <li
              data-level={numberToStringMap[toc.level]}
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
