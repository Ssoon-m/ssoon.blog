import { dateFormatter } from "@/lib/utils/date";
import { notFound } from "next/navigation";
import { allPosts } from "@/lib/utils/post";
import { useMDXComponent } from "next-contentlayer/hooks";

const BlankLink = (props: any) => {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) {
    // throw new Error(`Post not found for slug: ${params.slug}`);
    notFound();
  }
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {dateFormatter(post.date, "MM D, YYYY")}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <MDXContent components={{ a: BlankLink }} />
      {/* <div
        className="[&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      /> */}
    </article>
  );
};

export default PostLayout;
