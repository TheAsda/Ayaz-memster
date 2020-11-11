import React from 'react';
import { FlexboxGrid } from 'rsuite';
import { toggleSelected } from '../models/selected';
import { Meme } from '../types';

interface CardProps {
  meme: Meme;
  selected: boolean;
}

const Card = ({ meme, selected }: CardProps) => {
  return (
    <FlexboxGrid.Item
      style={{
        flex: '1 0 300px',
        border: '1px solid black',
        width: 240,
        borderRadius: 10,
        transform: selected ? 'scale(1.1)' : undefined,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '100%',
          gridTemplateRows: '350px auto',
          cursor: 'pointer',
        }}
        onClick={() => {
          toggleSelected(meme);
        }}
      >
        <img
          src={meme.imageUrl}
          alt={meme.title}
          style={{
            margin: 20,
            objectFit: 'contain',
            width: 'calc(100% - 40px)',
            height: 'calc(350px - 40px)',
          }}
        />
        <figcaption
          style={{ display: 'grid', placeItems: 'center', fontSize: 20 }}
        >
          {meme.title}
        </figcaption>
      </div>
    </FlexboxGrid.Item>
  );
};

export { Card };
