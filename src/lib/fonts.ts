import localFont from 'next/font/local';

export const pretendard = localFont({
  variable: '--Pretendard',
  src: [
    {
      path: '../fonts/Pretendard-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});
