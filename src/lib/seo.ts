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

export const defaultOpenGraph = {
  type: 'website',
  title: siteData.title,
  description: siteData.description,
  // url: siteData.url,
  siteName: siteData.title,
  locale: siteData.locale,
  images: [siteData.siteImage],
};

export const openGraphTwitter = {
  title: siteData.title,
  description: siteData.description,
  images: {
    url: siteData.siteImage,
    width: 1200,
    height: 630,
  },

  creator: siteData.auhtor.name,
  site: '',
};

export const defaultSEO = (): SEO => {
  return {
    alternates: { canonical: siteData.url },
    title: siteData.title,
    authors: { name: siteData.auhtor.name },
    description: siteData.description,
    creator: siteData.auhtor.name,
    icons: {
      icon: [
        {
          url: '/favicons/favicon_16.png',
          type: 'image/png',
          sizes: '16x16',
        },
        {
          url: '/favicons/favicon_32.png',
          type: 'image/png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          url: '/favicons/favicon_16.png',
          type: 'image/png',
          sizes: '32x32',
        },
      ],
      apple: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicons/favicon_180.png',
        type: 'image/png',
      },
    },
    manifest: '/favicons/manifest.json',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: openGraphTwitter,
    openGraph: defaultOpenGraph,
  };
};

export const siteSEO = ({
  title,
  description,
  pathname,
}: seoProps & OpenGraphProps = {}): SEO => {
  const openGraph = generateOpenGraph('website');
  return {
    alternates: { canonical: siteData.url },
    title: title ? `${title} | ${siteData.title}` : siteData.title,
    description: description && siteData.description,
    authors: { name: siteData.auhtor.name },
    creator: siteData.auhtor.name,
    openGraph: openGraph({ description, pathname }),
    twitter: {
      ...openGraphTwitter,
      title: title,
      description,
    },
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
      publishedTime,
      images,
      tags,
    }),
    twitter: {
      ...openGraphTwitter,
      title: title,
      description,
      images: images ?? openGraphTwitter.images,
    },
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
    if (type === 'website') {
      return {
        ...defaultOpenGraph,
        url: `${siteData.url}/${pathname}`,
        description,
        siteName: siteData.title,
        emails: siteData.auhtor.email,
        type,
      };
    }

    if (type === 'article') {
      return {
        ...defaultOpenGraph,
        url: `${siteData.url}/${pathname}`,
        description,
        publishedTime,
        authors: siteData.auhtor.github,
        images,
        tags,
        type,
      };
    }

    return null;
  };
