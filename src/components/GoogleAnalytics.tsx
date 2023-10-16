import Script from 'next/script';

const G_ID = 'G-JXXPGQ5M2Q';

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js? 
      id=${G_ID}`}
    ></Script>
    <Script
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${G_ID}');
        `,
      }}
    ></Script>
  </>
);
export default GoogleAnalytics;
