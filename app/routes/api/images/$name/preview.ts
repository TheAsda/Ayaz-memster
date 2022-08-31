import type { LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ params }) => {
  const { name } = params;

  const meme = await db.meme.findUnique({
    where: {
      id: name,
    },
    select: {
      preview: true,
    },
  });

  return new Response(meme?.preview, {
    headers: {
      'Content-Type': 'image/webp',
    },
  });
};
