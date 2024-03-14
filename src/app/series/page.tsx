import { getAllSeries } from '@/datasets/post';
import { siteSEO } from '@/lib/seo';
import { Metadata } from 'next';
import SeiresCardList from './components/SeiresCardList';

const SeriesPage = () => {
  const seriesList = getAllSeries();
  return (
    <div className="pt-6">
      <h1 className="text-4xl font-bold">Series</h1>
      <div className="py-2 text-gray-700 dark:text-gray-300">
        시리즈로 작성된 글을 모아서 보여줍니다.
      </div>
      <SeiresCardList seriesList={seriesList} />
    </div>
  );
};

export default SeriesPage;

export const metadata: Metadata = siteSEO({
  title: 'Series',
  description: '시리즈로 작성된 글 입니다.',
  pathname: 'series',
});
