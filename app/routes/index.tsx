import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MemeCard } from '~/components/MemeCard';
import { db } from '~/utils/db.server';
import type { Meme } from '../types/meme';

type LoaderData = { memes: Meme[]; totalMemes: number };

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');

  const totalMemes = await db.meme.count();
  const memes = (
    await db.meme.findMany({
      select: {
        name: true,
        id: true,
        uploadedBy: { select: { username: true } },
        uploadedAt: true,
      },
      where: { name: { contains: search ?? '', mode: 'insensitive' } },
    })
  ).map<Meme>((meme) => ({
    id: meme.id,
    name: meme.name,
    author: meme.uploadedBy.username,
    uploadedAt: meme.uploadedAt.toISOString(),
  }));
  return { memes, totalMemes };
};

export default function Index() {
  const { memes, totalMemes } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl font-semibold">Ayaz-Memster</h1>
        <p className="text-xl text-gray-500">
          {memes.length}/{totalMemes}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 p-2 max-w-full">
        {memes.map((meme) => {
          return <MemeCard meme={meme} key={meme.id} />;
        })}
      </div>
    </div>
  );
}
