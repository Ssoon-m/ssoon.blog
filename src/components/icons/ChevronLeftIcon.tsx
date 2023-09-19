const ChevronLeftIcon = ({
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
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
    </svg>
  );
};

export default ChevronLeftIcon;
