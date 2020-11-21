import 'react-lazy-load-image-component/src/effects/blur.css';

import React from 'react';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import { FlexboxGrid } from 'rsuite';

import { toggleSelected } from '../models/selected';
import { Meme } from '../types';

interface CardProps {
  meme: Meme;
  selected: boolean;
  scrollPosition: ScrollPosition;
}

const Card = ({ meme, selected, scrollPosition }: CardProps) => {
  return (
    <FlexboxGrid.Item
      style={{
        borderRadius: 10,
        transform: selected ? 'scale(1.1)' : undefined,
        backgroundColor: '#F7F7FA',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        margin: '10px 0',
        flexBasis: 350,
      }}
    >
      <div
        id={meme.title}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          toggleSelected(meme);
        }}
      >
        <LazyLoadImage
          src={meme.imageUrl}
          alt={meme.title}
          height={350}
          style={{
            margin: 20,
            objectFit: 'contain',
          }}
          scrollPosition={scrollPosition}
          effect="blur"
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
