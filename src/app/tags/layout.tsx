import BasicLayout from '@/components/layout/BasicLayout';

interface TagsLayoutProps {
  children: React.ReactNode;
}

const TagsLayout = ({ children }: TagsLayoutProps) => {
  return <BasicLayout>{children}</BasicLayout>;
};

export default TagsLayout;
