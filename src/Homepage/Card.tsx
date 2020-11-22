import 'react-lazy-load-image-component/src/effects/blur.css';

import React, { KeyboardEvent, useCallback } from 'react';
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
  const onEnterHandler = useCallback((e: KeyboardEvent<HTMLElement>) => {
    console.log(e);
    if (e.key === 'Enter') toggleSelected(meme);
  }, []);

  return (
    <FlexboxGrid.Item
      style={{
        borderRadius: 10,
        transform: selected ? 'scale(1.1)' : undefined,
        backgroundColor: '#F7F7FA',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        margin: '10px 0',
        flexBasis: 350,
        padding: 20,
        paddingBottom: 5,
      }}
    >
      <article
        id={meme.title}
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={() => {
          toggleSelected(meme);
        }}
        onKeyPress={onEnterHandler}
        tabIndex={0}
      >
        <LazyLoadImage
          src={meme.imageUrl}
          alt={meme.title}
          height={350}
          scrollPosition={scrollPosition}
          effect="blur"
        />
        <figcaption
          style={{ display: 'grid', placeItems: 'center', fontSize: 20 }}
        >
          {meme.title}
        </figcaption>
      </article>
    </FlexboxGrid.Item>
  );
};

export { Card };
