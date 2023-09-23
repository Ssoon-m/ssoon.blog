import Link from 'next/link';
import React from 'react';
import GithubIcon from '../icons/GithubIcon';

const GithubLink = () => {
  return (
    <span className="text-gray-400 hover:text-gray-500 transform">
      <span className="sr-only">Github</span>
      <Link
        href={'https://github.com/Ssoon-m'}
        target="_blank"
        aria-label="github"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </Link>
    </span>
  );
};

export default GithubLink;
