import { Metadata } from 'next';

export type SEO = Pick<
  Metadata,
  | 'title'
  | 'metadataBase'
  | 'alternates'
  | 'authors'
  | 'description'
  | 'creator'
  | 'icons'
  | 'openGraph'
  | 'manifest'
  | 'robots'
  | 'twitter'
  | 'openGraph'
>;

export type OpenGraph = Metadata['openGraph'];

export type OpenGraphType = 'website' | 'article';
