import PostCardList from '@/components/post/PostCardList';
import { siteData } from '@/constants/my-site';
import { getAllSeries, getSeriesBySlug } from '@/datasets/post';
import { articleSEO } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SeriesPage = ({ params }: { params: { slug: string } }) => {
  const slug = `blog/${params.slug}`;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();
  const { currentSeries, seriesList } = series;
  return (
    <div className="pt-6">
      <div className="bg-gray-100 rounded-sm p-4 mb-4">
        <h2 className="text-3xl font-medium">{currentSeries.title}</h2>
      </div>
      <PostCardList posts={seriesList} displayNumberedList />
    </div>
  );
};

export default SeriesPage;

export const generateStaticParams = () =>
  getAllSeries().map((series) => ({
    slug: series._raw.flattenedPath.replace(/^blog\//i, ''),
  }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const series = getSeriesBySlug(`blog/${params.slug}`);
  if (!series) {
    notFound();
  }
  return articleSEO({
    title: series.currentSeries.title,
    description: series.currentSeries.description,
    pathname: series.currentSeries.postUrl.replace(/^blog/i, 'series'),
    publishedTime: series.currentSeries.date,
    images: [series.currentSeries.thumbnailUrl || siteData.siteImage],
  });
};
