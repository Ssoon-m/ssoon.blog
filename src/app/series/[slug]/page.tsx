import { siteData } from '@/constants/my-site';
import { getAllSeries, getSeriesBySlug } from '@/datasets/post';
import { articleSEO } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { GlassContainer } from '@/components/ui';
import SeriesPostList from './components/SeriesPostList';

const SeriesPage = ({ params }: { params: { slug: string } }) => {
  const slug = `blog/${params.slug}`;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();
  const { currentSeries, seriesList } = series;
  return (
    <div className="pt-6">
      <GlassContainer
        className="p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
        variant="primary"
      >
        <div className="text-center">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full mr-1.5 sm:mr-2"></div>
            Series
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 leading-tight">
            {currentSeries.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {currentSeries.description}
          </p>
          <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {seriesList.length} articles
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {seriesList.reduce(
                (total: number, post: any) => total + post.readingTime,
                0,
              )}{' '}
              min read
            </div>
          </div>
        </div>
      </GlassContainer>

      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
          Articles in this series
        </h2>
        <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
      </div>

      <SeriesPostList posts={seriesList} />
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
