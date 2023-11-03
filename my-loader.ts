const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width?: number;
  quality?: number;
}) => {
  const params = width
    ? ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
    : ['f_auto', 'c_limit', `q_${quality || 'auto'}`];

  return `https://res.cloudinary.com/ssoon/image/upload/${params.join(
    ',',
  )}${src}`;
};

export default cloudinaryLoader;
