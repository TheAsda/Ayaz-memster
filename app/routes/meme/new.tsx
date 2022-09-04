import { Button } from '~/components/Button';
import { FormControl } from '~/components/FormControl';
import { FormLabel } from '~/components/FormLabel';
import { Input } from '~/components/Input';
import { useState } from 'react';
import { ImageDropzone } from '~/components/ImageDropzone';
import { ImageCropper } from '~/components/ImageCropper';
import cropStyles from 'react-image-crop/dist/ReactCrop.css';
import type { ActionFunction } from '@remix-run/node';
import {
  json,
  redirect,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import type { Crop } from 'react-image-crop';
import { useActionData, useSubmit } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { getIsAnimated, getPreview, getWebp } from '~/utils/image.server';
import slugify from 'slugify';
import { getUserId } from '~/utils/session.server';
import { FormErrorText } from '~/components/FormErrorText';

export const links = () => [{ rel: 'stylesheet', href: cropStyles }];

type FormState = {
  formError?: string;
  fieldErrors?: {
    name?: string;
    file?: string;
    crop?: string;
  };
  state?: {
    name?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_createMemoryUploadHandler();

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const name = formData.get('name')?.toString().trim();
  const file = formData.get('file');
  const crop = formData.get('crop')?.toString();

  const formState: FormState = {
    fieldErrors: {},
    state: {
      name,
    },
  };

  if (!name) {
    formState.fieldErrors!.name = 'Name is required';
  }
  if (!file || !(file instanceof File)) {
    formState.fieldErrors!.file = 'File is not selected';
  }
  if (!crop) {
    formState.fieldErrors!.crop = 'Preview is not selected';
  }
  if (Object.keys(formState.fieldErrors!).length > 0) {
    return json(formState, { status: 400 });
  }

  const meme = await db.meme.findFirst({
    where: { name: { equals: name, mode: 'insensitive' } },
    select: { id: true },
  });
  if (meme) {
    formState.fieldErrors!.name = 'Meme name already exists';
    return json(formState, { status: 400 });
  }
  const authorId = await getUserId(request);
  if (!authorId) {
    return json({ formError: 'You are not logged in' }, { status: 401 });
  }

  const fileBuffer = Buffer.from(await (file as File)!.arrayBuffer());
  const isAnimated = getIsAnimated(file as File);

  const image = await db.meme.create({
    data: {
      id: slugify(name!, { lower: true }),
      name: name!,
      image: await getWebp(fileBuffer, isAnimated),
      preview: await getPreview(fileBuffer, JSON.parse(crop!), isAnimated),
      isAnimated: isAnimated,
      uploadedBy: {
        connect: { id: authorId },
      },
    },
  });
  return redirect(`/meme/${image.id}`);
};

export default function NewMeme() {
  const formState = useActionData<FormState>();
  const [file, setFile] = useState<File | undefined>();
  const [crop, setCrop] = useState<Crop | undefined>();
  const submit = useSubmit();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    if (file) {
      formData.append('file', file);
    }
    if (crop) {
      formData.append('crop', JSON.stringify(crop));
    }

    e.preventDefault();
    submit(formData, { method: 'post', encType: 'multipart/form-data' });
  };

  return (
    <form
      method="POST"
      className="grid w-full md:max-w-lg gap-1 px-10 py-4 mx-auto"
      onSubmit={handleSubmit}
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input name="name" type="text" defaultValue={formState?.state?.name} />
        <FormErrorText>{formState?.fieldErrors?.name}</FormErrorText>
      </FormControl>
      <FormControl>
        <FormLabel>File</FormLabel>
        {!file ? (
          <ImageDropzone onDrop={setFile} />
        ) : (
          <>
            <ImageCropper imageFile={file} onCropChange={setCrop} />
            <FormErrorText>{formState?.fieldErrors?.crop}</FormErrorText>
            <Button
              type="button"
              onClick={() => {
                setFile(undefined);
                setCrop(undefined);
              }}
              className="border bg-gray-200 bg-inherit text-inherit"
            >
              Choose Another
            </Button>
          </>
        )}
        <FormErrorText>{formState?.fieldErrors?.file}</FormErrorText>
      </FormControl>
      <FormErrorText>{formState?.formError}</FormErrorText>
      <Button type="submit">Create</Button>
    </form>
  );
}
