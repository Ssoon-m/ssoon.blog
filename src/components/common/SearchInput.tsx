import SearchIcon from '../icons/SearchIcon';
import { GlassInput } from '@/components/ui';

const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <div className={`relative w-full ${className}`}>
      <GlassInput
        variant="search"
        icon={<SearchIcon width={20} height={20} />}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
