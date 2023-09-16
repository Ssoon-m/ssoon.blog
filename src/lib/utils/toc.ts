export const parseHeadersForTOC = (raw: string) => {
  const regex = /\n(?<flag>#{1,3})\s+(?<text>.+)/g;
  return Array.from(raw.matchAll(regex)).map((matchItem) => ({
    level: matchItem?.groups?.flag.length,
    text: matchItem?.groups?.text,
    slug: matchItem?.groups?.text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ|가-힣\s-]/g, '')
      .replace(/\s/g, '-'),
  }));
};
