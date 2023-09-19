const ChevronRightIcon = ({
  className,
  width = 24,
  height = 24,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      {...props}
    >
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    </svg>
  );
};

export default ChevronRightIcon;
