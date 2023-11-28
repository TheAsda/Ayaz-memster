import type { LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { getGif, getPng } from '~/utils/image.server';
import contentDisposition from 'content-disposition';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const meme = await db.meme.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      image: true,
      isAnimated: true,
    },
  });

  if (!meme) {
    return new Response(null, {
      status: 404,
    });
  }

  const file = meme.isAnimated
    ? getGif(meme.image, meme.isAnimated)
    : getPng(meme.image, meme.isAnimated);
  const filename = meme.isAnimated ? `${meme.name}.gif` : `${meme.name}.png`;

  return new Response(await file, {
    headers: {
      'Content-Disposition': contentDisposition(filename),
      'Content-Type': meme.isAnimated ? 'image/gif' : 'image/png',
    },
  });
};
