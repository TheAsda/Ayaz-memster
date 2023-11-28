import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getPreview, getWebp } from '~/utils/image.server';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new PrismaClient();

const seed = async () => {
  await db.user.createMany({
    data: [
      {
        username: 'admin',
        canAccess: true,
        canEdit: true,
        isAdmin: true,
      },
    ],
    skipDuplicates: true,
  });

  const admin = await db.user.findUniqueOrThrow({
    where: { username: 'admin' },
    select: { id: true },
  });

  const malfoyFile = join(__dirname, 'malfoy.gif');
  const knifeFile = join(__dirname, 'knife.jpg');
  const nosFile = join(__dirname, 'nos.jpg');
  const malfoyBuffer = await readFile(malfoyFile);
  const knifeBuffer = await readFile(knifeFile);
  const nosBuffer = await readFile(nosFile);

  await db.meme.createMany({
    data: [
      {
        id: 'Malfoy',
        name: 'Malfoy',
        image: await getWebp(malfoyBuffer, true),
        preview: await getPreview(
          malfoyBuffer,
          { x: 0, y: 0, height: 200, width: 200 },
          true
        ),
        isAnimated: true,
        userId: admin?.id,
      },
      {
        id: 'Knife',
        name: 'Knife',
        image: await getWebp(knifeBuffer, false),
        preview: await getPreview(
          knifeBuffer,
          { x: 100, y: 0, height: 200, width: 200 },
          false
        ),
        isAnimated: false,
        userId: admin?.id,
      },
      {
        id: 'Nos',
        name: 'Nos',
        image: await getWebp(nosBuffer, false),
        preview: await getPreview(
          nosBuffer,
          { x: 0, y: 0, height: 687, width: 687 },
          false
        ),
        isAnimated: false,
        userId: admin?.id,
      },
    ],
    skipDuplicates: true,
  });
};

seed();
