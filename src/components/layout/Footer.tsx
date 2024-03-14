import { siteData } from '@/constants/my-site';
import { dateFormatter } from '@/utils/date';
import Link from 'next/link';
import GithubLink from '../common/GithubLink';
import MailLink from '../common/MailLink';
import VelogLink from '../common/VelogLink';
const year = dateFormatter(new Date(), 'YYYY');

const Footer = () => {
  return (
    <footer className="bg-transparent w-full px-8 py-8 flex flex-col items-center gap-1 border-t border-gray-100 dark:border-gray-700">
      <div className="flex gap-2 items-center">
        <GithubLink />
        <VelogLink />
        <MailLink />
      </div>
      <div className="flex flex-col sm:inline-block text-sm text-gray-600 dark:text-gray-400">
        <span>
          © {year}{' '}
          <Link
            className="hover:underline text-gray-800 dark:text-gray-300"
            href={siteData.auhtor.projectRepo}
          >
            Ssoon blog
          </Link>
        </span>
        <span>
          {' '}
          Powered by{' '}
          <Link
            className="hover:underline text-gray-800 dark:text-gray-300"
            href="https://nextjs.org/"
          >
            Next.js
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
