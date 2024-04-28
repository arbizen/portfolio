import Image, { ImageProps } from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

export default async function CustomImage(props: ImageProps) {
  return (
    <div className="flex flex-col">
      <Image
        blurDataURL="/blur-placeholder.png"
        placeholder="blur"
        {...props}
      />
      <span className="my-4 mt-2 block text-sm italic text-slate-500">
        {props.alt}
      </span>
    </div>
  );
}
