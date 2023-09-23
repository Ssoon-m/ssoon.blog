const ArrowTopIcon = ({
  className,
  width = 14,
  height = 18,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      aria-hidden="true"
      viewBox="0 0 14 18"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M1 7L7 1M7 1L13 7M7 1V16.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowTopIcon;
