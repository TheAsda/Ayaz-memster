import isImageURL from 'image-url-validator';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Schema,
} from 'rsuite';
import { addMeme } from '../models/memes';
import { Meme } from '../types';

const model = Schema.Model({
  title: Schema.Types.StringType().isRequired('This field is required'),
  imageUrl: Schema.Types.StringType()
    .addRule(
      (value) => isImageURL(value),
      'Image URL should be a link to source image'
    )
    .isRequired('This field is required'),
});

const MemeForm = () => {
  const [state, setState] = useState<Meme>({ imageUrl: '', title: '' });

  return (
    <Form
      model={model}
      onChange={(value) => {
        setState(value as Meme);
      }}
      onSubmit={(status) => {
        if (status === true) {
          addMeme(state)
            .then(() => Alert.success('Meme added'))
            .catch((err) => Alert.error(err));
        }
      }}
    >
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl name="title"></FormControl>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Image URL</ControlLabel>
        <FormControl checkAsync name="imageUrl"></FormControl>
      </FormGroup>
      <FormGroup>
        <ButtonToolbar>
          <Button appearance="primary" type="submit">
            Submit
          </Button>
          <Button appearance="default" type="reset">
            Reset
          </Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>
  );
};

export { MemeForm };
