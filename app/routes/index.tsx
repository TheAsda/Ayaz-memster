import type { Meme } from '@prisma/client';
import { useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

type LoaderData = { memes: Pick<Meme, 'id' | 'name'>[] };

export const loader = async (): Promise<LoaderData> => {
  const memes = await db.meme.findMany({ select: { name: true, id: true } });
  return { memes };
};

export default function Index() {
  const { memes } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-2">
      {memes.map((meme) => {
        return (
          <div key={meme.id}>
            <img src={`/api/images/${meme.id}/preview`} alt={meme.name} />
            {meme.name}
          </div>
        );
      })}
    </div>
  );
}
