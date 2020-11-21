import { useStore } from 'effector-react';
import React, { useState } from 'react';
import { selectedStore } from '../models/selected';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';
import {
  Button,
  ButtonGroup,
  ControlLabel,
  Input,
  Loader,
  Slider,
} from 'rsuite';

const ConstructorPage = () => {
  const { selected } = useStore(selectedStore);
  const [topText, setTopText] = useState<string>('');
  const [botText, setBotText] = useState<string>('');
  const [textColor, setColorText] = useState<'black' | 'white'>('black');
  const [fontSize, setFontSize] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>();

  const downloadImage = () => {
    if (!canvasRef) {
      return;
    }
    setLoading(true);

    var url = canvasRef.toDataURL('image/jpg');
    var link = document.createElement('a');
    link.download = selected!.title + '.png';
    link.href = url;
    link.click();

    setLoading(false);
  };

  if (!selected?.title || !selected.imageUrl) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <h1>Looks like you have not selected a card.</h1>
      </div>
    );
  }
  const [image] = useImage(selected.imageUrl, 'anonymous');

  if (!image) {
    return <Loader />;
  }

  const scale = Math.min(500 / image.width, 500 / image.height);
  const x = 500 / 2 - (image.width / 2) * scale;
  const y = 500 / 2 - (image.height / 2) * scale;
  const width = image.width * scale;
  const height = image.height * scale;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        marginBottom: 40,
        marginTop: 40,
      }}
    >
      <div style={{ width: '100%' }}>
        <ControlLabel>Top text</ControlLabel>
        <Input value={topText} onChange={(e) => setTopText(e)} />
      </div>
      <Stage width={500} height={500}>
        <Layer
          ref={(ref) => {
            setCanvasRef(ref?.getCanvas()._canvas);
          }}
        >
          <Image
            image={image}
            width={width}
            height={height}
            x={x}
            y={y}
          ></Image>
          <Text
            text={topText}
            fontSize={fontSize}
            wrap="word"
            align="center"
            width={width}
            fontFamily="Impact"
            fill={textColor}
            stroke="black"
            x={x}
            draggable
          ></Text>
          <Text
            text={botText}
            fontSize={fontSize}
            wrap="word"
            align="center"
            width={width}
            y={height - fontSize}
            fontFamily="Impact"
            fill={textColor}
            stroke="black"
            x={x}
            draggable
          ></Text>
        </Layer>
      </Stage>
      <div style={{ width: '100%' }}>
        <ControlLabel>Bottom text</ControlLabel>
        <Input value={botText} onChange={(e) => setBotText(e)} />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
          <ControlLabel>Text color</ControlLabel>
          <ButtonGroup>
            <Button onClick={() => setColorText('black')}>Black</Button>
            <Button onClick={() => setColorText('white')}>White</Button>
          </ButtonGroup>
        </div>
        <div
          style={{
            flexGrow: 3,
            display: 'flex',
            flexFlow: 'column nowrap',
          }}
        >
          <ControlLabel>Font size</ControlLabel>
          <div
            style={{
              height: 36,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Slider
              max={60}
              min={15}
              value={fontSize}
              onChange={setFontSize}
              tooltip={false}
            />
          </div>
        </div>
      </div>

      <Button appearance="primary" onClick={downloadImage} loading={loading}>
        Download
      </Button>
    </div>
  );
};

export { ConstructorPage as default };
