import { useStore } from 'effector-react';
import React from 'react';
import { memesStore } from '../models/memes';
import { FlexboxGrid, Grid } from 'rsuite';

const MemesGrid = () => {
  const memes = useStore(memesStore);

  return (
    <FlexboxGrid flexWrap="wrap" justify="start" direction="row">
      {memes.map((item, i) => {
        return (
          <FlexboxGrid.Item style={{ flex: '1 0 25%' }} key={i}>
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{
                margin: 20,
                objectFit: 'contain',
                height: 300,
                minWidth: 300,
              }}
            />
            <FlexboxGrid display="flex" justifyContent="center" bg="">
              <figcaption>{item.title}</figcaption>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        );
      })}
    </FlexboxGrid>
  );
};

export { MemesGrid };
