import { type Toc } from '../types/toc-type';
import GithubSlugger from 'github-slugger';

export const parseHeadersForTOC = (raw: string) => {
  const regex = /\n(?<flag>#{1,3})\s+(?<text>.+)/g;
  const slugger = new GithubSlugger();
  return Array.from(raw.matchAll(regex)).reduce<Toc[]>((acc, matchItem) => {
    const groups = matchItem.groups;
    if (groups) {
      acc.push({
        level:
          groups.flag.length === 2
            ? 'two'
            : groups.flag.length === 3
            ? 'three'
            : 'one',
        text: groups.text,
        slug: slugger.slug(groups.text),
      });
    }
    return acc;
  }, []);
};
