import { siteData } from '@/constants/my-site';
import Link from 'next/link';
import React from 'react';
import VelogIcon from '../icons/VelogIcon';

const VelogLink = () => {
  return (
    <span className="text-gray-400 hover:text-gray-500 transform">
      <span className="sr-only">Velog</span>
      <Link
        href={siteData.auhtor.velog}
        target="_blank"
        aria-label="velog"
        rel="noopener noreferrer"
      >
        <VelogIcon />
      </Link>
    </span>
  );
};

export default VelogLink;
