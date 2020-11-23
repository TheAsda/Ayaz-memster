import { useStore } from 'effector-react';
import React from 'react';
import {
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component';

import { memesStore } from '../models/memes';
import { searchStore } from '../models/search';
import { selectedStore } from '../models/selected';
import { Card } from './Card';

const MemesGrid = ({ scrollPosition }: { scrollPosition: ScrollPosition }) => {
  const searchString = useStore(searchStore);
  const memes = useStore(memesStore).filter(
    (meme) =>
      meme.title
        .toLocaleLowerCase()
        .indexOf(searchString.toLocaleLowerCase()) !== -1
  );
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
            scrollPosition={scrollPosition}
          />
        );
      })}
    </div>
  );
};

const MemesGridWithScroll = trackWindowScroll(MemesGrid);

export { MemesGridWithScroll as MemesGrid };
