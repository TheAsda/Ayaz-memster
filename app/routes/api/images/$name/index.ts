import type { LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
  const { name } = params;

  const meme = await db.meme.findUnique({
    where: {
      id: name,
    },
    select: {
      image: true,
      isAnimated: true,
    },
  });

  return new Response(meme?.image, {
    headers: {
      'Content-Type': meme?.isAnimated ? 'image/gif' : 'image/png',
    },
  });
};
