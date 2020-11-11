import { useStore } from 'effector-react';
import React from 'react';
import { memesStore } from '../models/memes';
import { Flex, Grid, Heading, Image } from '@chakra-ui/core';

const MemesGrid = () => {
  const memes = useStore(memesStore);

  return (
    <Flex flexWrap="wrap" justify="flex-start" direction="row">
      {memes.map((item, i) => {
        return (
          <Flex key={i} direction="column" alignItems="center">
            <Image
              src={item.imageUrl}
              alt={item.title}
              size="250px"
              objectFit="contain"
              style={{
                margin: 20,
              }}
            />
            <Heading>{item.title}</Heading>
          </Flex>
        );
      })}
    </Flex>
  );
};

export { MemesGrid };
