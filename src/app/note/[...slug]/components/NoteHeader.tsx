import { dateFormatter } from '@/utils/date';

interface NoteHeaderProps {
  title: string;
  date: string;
}

const NoteHeader = ({ title, date }: NoteHeaderProps) => {
  return (
    <header className="text-left">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className=" text-sm text-gray-400">
        <time dateTime={date}>{dateFormatter(date, 'YYYY-MM-DD')}</time>
      </p>
    </header>
  );
};

export default NoteHeader;
