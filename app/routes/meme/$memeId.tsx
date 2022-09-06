import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import type { Meme } from '~/types/meme';
import { db } from '~/utils/db.server';

export const meta: MetaFunction = ({ params, data }) => {
  const { memeId } = params;
  const { meme } = data as LoaderData;

  return {
    title: `Ayaz-Memster - ${meme.name} Meme`,
    description: `${meme.name} meme by ${meme.author}`,
    'og:image': `/api/images/${memeId}`,
  };
};

type LoaderData = {
  meme: Meme;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { memeId } = params;
  const meme = await db.meme.findUnique({
    where: { id: memeId },
    select: {
      name: true,
      uploadedBy: { select: { username: true } },
      uploadedAt: true,
    },
  });

  if (!meme) {
    return { status: 404 };
  }

  return {
    meme: {
      id: memeId,
      name: meme.name,
      author: meme.uploadedBy.username,
      uploadedAt: meme.uploadedAt.toISOString(),
    },
  };
};

export default function MemeInfo() {
  const { meme } = useLoaderData<LoaderData>();

  const share = () => {
    if ('share' in navigator) {
      navigator.share({
        url: window.location.href,
        title: `Ayaz Meme ${meme.name}`,
      });
    } else {
      alert('Sharing not supported');
    }
  };

  return (
    <div className="p-2 max-w-6xl m-auto flex flex-col gap-2">
      <div className="flex justify-between">
        <Link
          to="/"
          className="p-1 hover:bg-purple-600 aspect-square grid place-items-center w-9 h-9 rounded-sm"
        >
          <ArrowLeftIcon />
        </Link>
        <div className="flex gap-2">
          <button
            className="p-1 hover:bg-purple-600 aspect-square grid place-items-center w-9 h-9 rounded-sm"
            onClick={share}
          >
            <ShareIcon />
          </button>
          <a
            className="p-1 hover:bg-purple-600 aspect-square grid place-items-center w-9 h-9 rounded-sm"
            href={`/api/images/${meme.id}/download`}
            download
          >
            <ArrowDownTrayIcon />
          </a>
        </div>
      </div>
      <figure>
        <img
          className="w-full max-h-[80vh] object-contain"
          src={`/api/images/${meme.id}`}
          alt={meme.name}
        />
        <figcaption className="text-2xl font-bold">{meme.name}</figcaption>
      </figure>
      <div className="flex justify-between">
        <p>Uploaded By {meme.author}</p>
        <p>
          <ClientOnly fallback={meme.uploadedAt}>
            {() =>
              Intl.DateTimeFormat(undefined, {
                dateStyle: 'short',
                timeStyle: 'short',
              }).format(new Date(meme.uploadedAt))
            }
          </ClientOnly>
        </p>
      </div>
    </div>
  );
}
