import isImageURL from 'image-url-validator';
import React from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Schema,
} from 'rsuite';

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
  return (
    <Form model={model}>
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
