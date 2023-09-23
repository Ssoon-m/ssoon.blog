import SearchIcon from '../icons/SearchIcon';

const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={props.type}
        className="w-full pl-3 pr-8 py-2 rounded  bg-zinc-100 border border-zinc-100 dark:border-zinc-800 focus:border-zinc-200 dark:focus:border-zinc-700 focus:outline-none dark:bg-zinc-800"
        {...props}
      />
      <SearchIcon
        className="absolute right-3 top-3 text-zinc-400 dark:text-zinc-300"
        width={20}
        height={20}
      />
    </div>
  );
};

export default SearchInput;
