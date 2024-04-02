import Image, { ImageProps } from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

export default async function CustomImage(props: ImageProps) {
  return (
    <Image blurDataURL="/blur-placeholder.png" placeholder="blur" {...props} />
  );
}
