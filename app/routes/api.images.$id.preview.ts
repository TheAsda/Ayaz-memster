import type { LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const meme = await db.meme.findUnique({
    where: {
      id: id,
    },
    select: {
      preview: true,
    },
  });

  if (!meme) {
    return new Response(null, {
      status: 404,
    });
  }

  return new Response(meme.preview, {
    headers: {
      'Content-Type': 'image/webp',
    },
  });
};
