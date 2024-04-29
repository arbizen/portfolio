import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

interface Props extends ImageProps {
  link: string;
}

export default async function CustomImage(props: Props) {
  return (
    <Link href={props.link} className="flex flex-col">
      <Image
        blurDataURL="/blur-placeholder.png"
        placeholder="blur"
        {...props}
      />
      <span className="my-4 mt-2 block text-sm italic text-slate-500">
        {props.alt}
      </span>
    </Link>
  );
}
