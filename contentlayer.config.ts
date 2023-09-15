import {
  ComputedFields,
  FieldDefs,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkBreaks from 'remark-breaks';
import readingTime from 'reading-time';

const fields: FieldDefs = {
  title: { type: 'string', required: true },
  date: { type: 'date', required: true },
  description: { type: 'string', required: true },
  thumbnailUrl: { type: 'string', required: true },
  tags: {
    type: 'list',
    required: true,
    of: {
      type: 'string',
    },
    default: [],
  },
};

const computedFields: ComputedFields<'Post'> = {
  url: {
    type: 'string',
    resolve: (post) => `/posts/${post._raw.flattenedPath}`,
  },
  readingTime: {
    type: 'string',
    resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields,
  computedFields,
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      rehypePrismPlus,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
