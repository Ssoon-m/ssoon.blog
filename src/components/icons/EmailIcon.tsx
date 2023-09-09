import React from "react";

const EmailIcon = ({
  className,
  width = 24,
  height = 24,
  ...props
}: React.ComponentProps<"svg">) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
      width={width}
      height={height}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z"
      ></path>
      <path
        d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default EmailIcon;
