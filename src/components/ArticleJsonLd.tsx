import { siteData } from '@/constants/my-site';
import { Article } from 'schema-dts';

interface ArticleJsonLdProps {
  headline: string;
  datePublished: string;
  description: string;
  pathname: string;
  image: string;
}

const ArticleJsonLd = ({
  headline,
  datePublished,
  description,
  pathname,
  image,
}: ArticleJsonLdProps) => {
  const jsonLd: Article = {
    '@type': 'TechArticle',
    datePublished,
    headline,
    image: image,
    description: description,
    url: `${siteData.url}/${pathname}`,
    author: [
      {
        '@type': 'Person',
        name: siteData.auhtor.name,
        email: siteData.auhtor.email,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ArticleJsonLd;
