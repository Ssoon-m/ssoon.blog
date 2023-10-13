import { writeFileSync } from 'fs';
import postJson from '../.contentlayer/generated/Post/_index.json';
import noteJson from '../.contentlayer/generated/Note/_index.json';
import { siteData } from '../src/constants/my-site';
import { glob } from 'glob';

const createSiteMap = async () => {
  const siteUrl = siteData.url;
  const pages = await glob(['src/app/*/']);
  const paths = pages.map((page) => page.replace('src/app/', ''));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url><loc>${siteUrl}</loc><changefreq>daily</changefreq></url>
  ${paths
    .map(
      (path) =>
        `<url><loc>${siteUrl}/${path}</loc><changefreq>daily</changefreq></url>`,
    )
    .join('\n')}
    ${postJson
      .map(
        ({ date, postUrl }) =>
          `<url><loc>${siteUrl}/${postUrl}</loc><changefreq>daily</changefreq><lastmod>${date}</lastmod></url>`,
      )
      .join('\n')}
    ${noteJson
      .map(
        ({ date, noteUrl }) =>
          `<url><loc>${siteUrl}/${noteUrl}</loc><changefreq>daily</changefreq><lastmod>${date}</lastmod></url>`,
      )
      .join('\n')}
  </urlset>`;
  writeFileSync('out/sitemap.xml', sitemap, 'utf-8');
};

(() => createSiteMap())();
