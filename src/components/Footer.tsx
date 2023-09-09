import { dateFormatter } from '@/lib/utils/date';
import Link from 'next/link';
import GithubIcon from './icons/GithubIcon';
import VelogIcon from './icons/VelogIcon';
import EmailIcon from './icons/EmailIcon';
const year = dateFormatter(new Date(), 'YYYY');

const Footer = () => {
  return (
    <footer className="w-full px-8 py-8 text-sm text-gray-600 flex flex-col items-center gap-1 border-t border-gray-100">
      <div className="flex gap-2 items-center">
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
        <span className="text-gray-400 hover:text-gray-500 transform">
          <span className="sr-only">Velog</span>
          <Link
            href={'https://velog.io/@ssoon-m'}
            target="_blank"
            aria-label="velog"
            rel="noopener noreferrer"
          >
            <VelogIcon />
          </Link>
        </span>
        <span className="text-gray-400 hover:text-gray-500 transform">
          <span className="sr-only">Velog</span>
          <Link
            href={'mailto:tkksm2@gmail.com'}
            target="_blank"
            aria-label="email"
          >
            <EmailIcon />
          </Link>
        </span>
      </div>
      <div className="flex flex-col sm:inline-block">
        <span>© {year} Ssoon blog</span>
        <span>
          {' '}
          Powered by{' '}
          <Link className="hover:underline" href="https://nextjs.org/">
            Next.js
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
