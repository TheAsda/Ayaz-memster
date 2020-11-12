import React from 'react';
import { FlexboxGrid } from 'rsuite';
import { MemeForm } from './MemeForm';

const AddPage = () => {
  return (
    <FlexboxGrid style={{ marginTop: 100 }} align="middle" justify="center">
      <MemeForm />
    </FlexboxGrid>
  );
};

export { AddPage };
