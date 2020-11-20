import isImageURL from 'image-url-validator';
import React, { useRef, useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string | undefined>>({});

  const submit = () => {
    if (Object.keys(error).reduce((acc, key) => !!error[key] || acc, false)) {
      Alert.error('Form must have valid data');
      return;
    }
    if (!state.title || !state.imageUrl) {
      Alert.error('Add fields must be filled');
      return;
    }
    setLoading(true);
    addMeme(state)
      .then(() => {
        setLoading(false);
        Alert.success('Meme added');
      })
      .catch((err) => {
        setLoading(false);
        Alert.error(err);
      });
  };

  return (
    <Form
      model={model}
      onChange={(value) => {
        setState(value as Meme);
        ``;
      }}
      onCheck={(data) => {
        setError(data);
      }}
      onSubmit={submit}
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
          <Button appearance="primary" type="submit" loading={loading}>
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
