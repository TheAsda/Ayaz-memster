import type { Meme } from '../types/meme';
import { Link } from '@remix-run/react';

export interface MemeCardProps {
  meme: Meme;
}

export const MemeCard = (props: MemeCardProps) => {
  const { meme } = props;

  return (
    <Link
      to={`/meme/${meme.id}`}
      className="grid place-items-stretch p-3 shadow-md rounded-sm"
    >
      <figure className="flex flex-col">
        <img
          src={`/api/images/${meme.id}/preview`}
          alt={meme.name}
          loading="lazy"
          width="300"
          height="300"
          className="w-full"
        />
        <figcaption className="text-lg font-semibold">{meme.name}</figcaption>
      </figure>
      <p className="text-gray-500 text-sm">Uploaded By: {meme.author}</p>
    </Link>
  );
};
