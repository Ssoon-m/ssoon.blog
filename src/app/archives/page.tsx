import { getTagsOfPosts } from '@/datasets/post';

const ArchivesPage = () => {
  const tags = getTagsOfPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold">Archives</h1>
      <div className="text-gray-700 dark:text-gray-300">archives</div>
      <div>
        {tags.map(([key, value]) => (
          <div key={key}>
            Key : {key} , Value : {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivesPage;
