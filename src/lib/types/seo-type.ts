import { Metadata } from 'next';

export type SEO = Pick<
  Metadata,
  | 'title'
  | 'alternates'
  | 'authors'
  | 'description'
  | 'creator'
  | 'icons'
  | 'openGraph'
  | 'manifest'
  | 'robots'
  | 'openGraph'
>;

export type OpenGraph = Metadata['openGraph'];

export type OpenGraphType = 'website' | 'article';