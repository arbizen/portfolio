import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
// @ts-ignore
import dateformat from 'dateformat';

interface Props extends ImageProps {
  link: string;
  date?: string;
}

export default async function CustomImage(props: Props) {
  const { date, ...imageProps } = props;
  
  return (
    <div className="break-inside-avoid mb-4">
      <Link href={props.link} className="flex flex-col">
        <div className="img-placeholder">
          <Image
            unoptimized
            {...imageProps}
            className={`${props.className} w-full rounded-md`}
            loading="lazy"
          />
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm italic text-slate-500">
            {props.alt}
          </span>
          {date && (
            <span className="text-xs text-slate-400">
              {dateformat(date, 'dd/mm/yyyy')}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
