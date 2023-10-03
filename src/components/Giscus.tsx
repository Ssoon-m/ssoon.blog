'use client';
import { useGetCurrentTheme } from '@/hooks/useGetCurrentTheme';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

function sendMessage<T>(option: T) {
  const iframe = document.querySelector<HTMLIFrameElement>(
    'iframe.giscus-frame',
  );
  if (!iframe) return;
  iframe.contentWindow?.postMessage(
    { giscus: { setConfig: option } },
    'https://giscus.app',
  );
}
const Giscus = () => {
  const theme = useGetCurrentTheme();
  const ref = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (!ref.current) return;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.dataset.repo = 'Ssoon-m/ssoon.blog';
    script.dataset.repoId = 'R_kgDOKKGGZg';
    script.dataset.category = 'General';
    script.dataset.categoryId = 'DIC_kwDOKKGGZs4CZgJ3';
    script.dataset.mapping = 'pathname';
    script.dataset.strict = '0';
    script.dataset.reactionsEnabled = '1';
    script.dataset.emitMetadata = '0';
    script.dataset.inputPosition = 'bottom';
    script.dataset.theme = theme;
    script.dataset.lang = 'en';
    script.crossOrigin = 'anonymous';
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  useEffect(() => {
    sendMessage({ theme });
  }, [theme]);

  useEffect(() => {
    sendMessage({ term: pathname });
  }, [pathname]);

  return <div ref={ref} className="giscus"></div>;
};

export default Giscus;
