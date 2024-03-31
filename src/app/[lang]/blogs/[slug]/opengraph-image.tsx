import { ImageResponse } from 'next/og';
import { notionManager } from '@/lib/NotionManager';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const pageInfo = await notionManager.getPageById(decodedSlug.split('#')[1]);

  const coverUrl =
    (pageInfo as any)?.cover?.external?.url ||
    'https://source.unsplash.com/a-person-standing-on-top-of-a-mountain-nMzbnMzMjYU';
  const title =
    (pageInfo as any)?.properties?.title?.title[0]?.plain_text || 'Blog';

  //   const interSemiBold = fetch(
  //     new URL('./Inter-SemiBold.ttf', import.meta.url),
  //   ).then((res) => res.arrayBuffer());
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 100,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <img
          src={coverUrl}
          alt={title}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'blur(10px)',
          }}
        />
        {title}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
