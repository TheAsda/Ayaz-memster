import { useStore } from 'effector-react';
import React from 'react';
import { FlexboxGrid, Grid } from 'rsuite';
import { memesStore } from '../models/memes';
import { selectedStore } from '../models/selected';
import { Card } from './Card';

const MemesGrid = () => {
  const memes = useStore(memesStore);
  const { selected } = useStore(selectedStore);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        margin: '20px 0',
        justifyContent: 'space-between',
        gap: 5,
      }}
    >
      {memes.map((item, i) => {
        return (
          <Card
            key={i}
            meme={item}
            selected={
              item.imageUrl === selected?.imageUrl &&
              item.title === selected.title
            }
          />
        );
      })}
    </div>
  );
};

export { MemesGrid };
