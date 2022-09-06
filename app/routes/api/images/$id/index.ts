import type { LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const meme = await db.meme.findUnique({
    where: {
      id: id,
    },
    select: {
      image: true,
    },
  });

  if (!meme) {
    return new Response(null, {
      status: 404,
    });
  }

  return new Response(meme.image, {
    headers: {
      'Content-Type': 'image/webp',
    },
  });
};
