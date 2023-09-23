import Link from 'next/link';
import EmailIcon from '../icons/EmailIcon';

const MailLink = () => {
  return (
    <span className="text-gray-400 hover:text-gray-500 transform">
      <span className="sr-only">e-Mail</span>
      <Link href={'mailto:tkksm2@gmail.com'} target="_blank" aria-label="email">
        <EmailIcon />
      </Link>
    </span>
  );
};

export default MailLink;
