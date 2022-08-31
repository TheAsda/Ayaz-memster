import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { getHash } from '~/utils/hash.server';

const db = new PrismaClient();

const seed = async () => {
  await db.user.create({
    data: {
      username: 'admin',
      passwordHash: getHash('admin'),
      canAccess: true,
      canEdit: true,
    },
  });
  await db.user.create({
    data: {
      username: 'viewer',
      passwordHash: getHash('viewer'),
      canAccess: true,
      canEdit: false,
    },
  });
  await db.user.create({
    data: {
      username: 'nikto',
      passwordHash: getHash('nikto'),
      canAccess: false,
      canEdit: false,
    },
  });

  const malfoyFile = join(__dirname, 'malfoy.gif');
  await db.meme.create({
    data: {
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
    },
  });
  const knifeFile = join(__dirname, 'knife.jpg');
  await db.meme.create({
    data: {
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
    },
  });
};

seed();
