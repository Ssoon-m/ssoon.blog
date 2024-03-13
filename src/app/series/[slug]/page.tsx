// export const generateStaticParams = () =>
//   getAllFilteredPosts().map((post) => ({
//     slug: post._raw.flattenedPath.replace(/blog\//i, '').split('/'),
// }));

import PostCardList from '@/components/post/PostCardList';
import { getSeriesBySlug } from '@/datasets/post';
import { notFound } from 'next/navigation';

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] };
}) => {
  // const post = getPostBySlug(`blog/${params.slug.join('/')}`);
  // if (!post) {
  //   notFound();
  // }
  // return articleSEO({
  //   title: post.title,
  //   description: post.description,
  //   pathname: post.postUrl,
  //   publishedTime: post.date,
  //   images: [post.thumbnailUrl || siteData.siteImage],
  //   tags: post.tags,
  // });
};

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
