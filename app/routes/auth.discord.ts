import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.authenticate('Discord', request, {
    successRedirect: '/',
  });
};
