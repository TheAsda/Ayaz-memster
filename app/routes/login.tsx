import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Button } from '~/components/Button';
import { authenticator } from '~/utils/auth.server';

export const meta: MetaFunction = () => [
  {
    title: 'Ayaz-Memster - Login',
  },
];

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate('Discord', request, {
    successRedirect: '/',
  });
};

type LoaderData = {
  isAuthenticated: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
  return {
    isSignedIn: await authenticator.isAuthenticated(request),
  };
};

export default function Login() {
  const { isAuthenticated } = useLoaderData<LoaderData>();

  if (isAuthenticated) {
    return (
      <div>
        <p>Already signed in</p>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      <form method="POST">
        <Button type="submit">Sign in with Discord</Button>
      </form>
      <div className="pattern flex-grow hidden md:block" />
    </div>
  );
}
