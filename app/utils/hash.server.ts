import { createHash } from 'crypto';

export const getHash = (password: string) => {
  return createHash('sha512').update(password).digest('base64');
};
