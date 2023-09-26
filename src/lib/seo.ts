import { siteData } from '@/constants/my-site';
import type { OpenGraph, OpenGraphType, SEO } from './types/seo-type';

interface seoProps {
  title?: string;
  description?: string;
}

interface OpenGraphProps {
  description?: string;
  pathname?: string;
  publishedTime?: string;
  images?: Array<string>;
  tags?: Array<string>;
}

export const siteSEO = ({
  title,
  description,
  pathname,
}: seoProps & OpenGraphProps = {}): SEO => {
  const openGraph = generateOpenGraph('website');
  return {
    alternates: { canonical: siteData.url },
    title: title ? `${title} | ${siteData.title}` : siteData.title,
    authors: { name: siteData.auhtor.name },
    description: description && siteData.description,
    creator: siteData.auhtor.name,
    icons: null,
    manifest: null,
    robots: null,
    openGraph: openGraph({ description, pathname }),
  };
};

export const articleSEO = ({
  title,
  description,
  pathname,
  publishedTime,
  images,
  tags,
}: seoProps & OpenGraphProps = {}): SEO => {
  const openGraph = generateOpenGraph('article');
  return {
    title: title,
    description: description,
    openGraph: openGraph({
      description,
      pathname,
      images,
      publishedTime,
      tags,
    }),
  };
};

const generateOpenGraph =
  (type: OpenGraphType) =>
  ({
    description,
    pathname,
    publishedTime,
    images,
    tags,
  }: OpenGraphProps): OpenGraph => {
    const defaultOpenGraph = {
      title: siteData.title,
      description: description,
      url: pathname ? `${siteData.url}/${pathname}` : siteData.url,
      locale: 'ko-KR',
      images: '',
    };

    if (type === 'website') {
      return {
        ...defaultOpenGraph,
        siteName: siteData.title,
        emails: siteData.auhtor.email,
        type,
      };
    }

    if (type === 'article') {
      return {
        ...defaultOpenGraph,
        publishedTime,
        authors: siteData.auhtor.github,
        images,
        tags,
        type,
      };
    }

    return null;
  };
