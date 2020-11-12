import { useStore } from 'effector-react';
import React from 'react';
import { FlexboxGrid } from 'rsuite';
import { memesStore } from '../models/memes';
import { selectedStore } from '../models/selected';
import { Card } from './Card';


const MemesGrid = () => {
  const memes = useStore(memesStore);
  const { selected } = useStore(selectedStore);

  return (
    <FlexboxGrid
      justify="start"
      direction="row"
      style={{ gap: 20, flexShrink: 1, margin: '20px 0' }}
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
    </FlexboxGrid>
  );
};

export { MemesGrid };

