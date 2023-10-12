import { siteData } from '@/constants/my-site';
import Link from 'next/link';
import EmailIcon from '../icons/EmailIcon';

interface MailLinkProps {
  width?: number;
  height?: number;
}

const MailLink = ({ width = 24, height = 24 }: MailLinkProps) => {
  return (
    <span className="text-gray-400 hover:text-gray-500 transform">
      <span className="sr-only">e-Mail</span>
      <Link
        href={`mailto:${siteData.auhtor.email}`}
        target="_blank"
        aria-label="email"
      >
        <EmailIcon width={width} height={height} />
      </Link>
    </span>
  );
};

export default MailLink;
