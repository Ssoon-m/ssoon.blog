import {
  ComputedFields,
  FieldDefs,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkBreaks from 'remark-breaks';
import readingTime from 'reading-time';
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from 'rehype-pretty-code';
import { readFileSync } from 'fs';

const fields: FieldDefs = {
  title: { type: 'string', required: true },
  date: { type: 'date', required: true },
};

const PostFields: FieldDefs = {
  ...fields,
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

const PostComputedFields: ComputedFields<'Post'> = {
  postUrl: {
    type: 'string',
    resolve: (post) => post._raw.flattenedPath,
  },
  readingTime: {
    type: 'string',
    resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
  },
};

const NoteComputedFields: ComputedFields<'Note'> = {
  noteUrl: {
    type: 'string',
    resolve: (note) => note._raw.flattenedPath,
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: PostFields,
  computedFields: PostComputedFields,
}));

export const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: `note/**/*.mdx`,
  contentType: 'mdx',
  fields,
  computedFields: NoteComputedFields,
}));

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    dark: JSON.parse(readFileSync('./prettycode_theme/one-dark.json', 'utf-8')),
    light: JSON.parse(
      readFileSync('./prettycode_theme/one-light.json', 'utf-8'),
    ),
  },
};

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post, Note],
  mdx: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
      [rehypePrettyCode, rehypePrettyCodeOptions],
    ],
  },
});
