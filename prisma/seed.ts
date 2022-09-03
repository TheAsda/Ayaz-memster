import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { getHash } from '~/utils/hash.server';

const db = new PrismaClient();

const seed = async () => {
  await db.user.createMany({
    data: [
      {
        username: 'admin',
        passwordHash: getHash('admin'),
        canAccess: true,
        canEdit: true,
        isAdmin: true,
      },
      {
        username: 'viewer',
        passwordHash: getHash('viewer'),
        canAccess: true,
        canEdit: false,
      },
      {
        username: 'nikto',
        passwordHash: getHash('nikto'),
        canAccess: false,
        canEdit: false,
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
  const ilyuhaFile = join(__dirname, 'ilyuha.jpg');
  await db.meme.createMany({
    data: [
      {
        id: 'Malfoy',
        name: 'Malfoy',
        image: await readFile(malfoyFile),
        preview: await sharp(malfoyFile)
          .resize({
            fit: 'cover',
            width: 300,
            height: 300,
          })
          .webp()
          .toBuffer(),
        isAnimated: true,
        userId: admin?.id,
      },
      {
        id: 'Knife',
        name: 'Knife',
        image: await readFile(knifeFile),
        preview: await sharp(knifeFile)
          .resize({
            fit: 'cover',
            width: 300,
            height: 300,
          })
          .webp()
          .toBuffer(),
        isAnimated: false,
        userId: admin?.id,
      },
      {
        id: 'Ilyuha',
        name: 'Ilyuha',
        image: await readFile(ilyuhaFile),
        preview: await sharp(ilyuhaFile)
          .resize({
            fit: 'cover',
            width: 300,
            height: 300,
          })
          .webp()
          .toBuffer(),
        isAnimated: false,
        userId: admin?.id,
      },
    ],
    skipDuplicates: true,
  });
};

seed();
