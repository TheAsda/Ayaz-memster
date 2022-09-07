import type { ActionFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '~/components/Button';
import { FormControl } from '~/components/FormControl';
import { FormErrorText } from '~/components/FormErrorText';
import { FormLabel } from '~/components/FormLabel';
import { Input } from '~/components/Input';
import { db } from '~/utils/db.server';
import { getHash } from '~/utils/hash.server';
import { createUserSession } from '~/utils/session.server';

export const meta: MetaFunction = () => ({
  title: 'Ayaz-Memster - Login',
});

const usernameSchema = z
  .string({ required_error: 'Username is required' })
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters');
const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(5, 'Password must be at least 5 characters');

type FormState = {
  formError?: string;
  fieldErrors?: {
    username?: string;
    password?: string;
  };
  state: {
    type?: 'register' | 'login';
    username?: string;
    password?: string;
  };
};

const badRequest = (data: FormState) => json(data, { status: 400 });

const register = async (username: string, password: string) => {
  const usernameResult = usernameSchema.safeParse(username);
  const passwordResult = passwordSchema.safeParse(password);

  const formState: FormState = {
    fieldErrors: {},
    state: { type: 'register', username, password },
  };
  if (!usernameResult.success) {
    formState.fieldErrors!.username = usernameResult.error
      .flatten()
      .formErrors.join(', ');
  }
  if (!passwordResult.success) {
    formState.fieldErrors!.password = passwordResult.error
      .flatten()
      .formErrors.join(', ');
  }
  if (Object.keys(formState.fieldErrors!).length > 0) {
    console.log('formState', formState);
    return badRequest(formState);
  }
  const user = await db.user.findUnique({ where: { username } });
  if (user) {
    formState.fieldErrors!.username = 'Username already exists';
    return badRequest(formState);
  }
  const createdUser = await db.user.create({
    data: { username, passwordHash: getHash(password) },
  });
  return createUserSession(createdUser.id, '/');
};

const login = async (username: string, password: string) => {
  const user = await db.user.findFirst({
    where: { username: { equals: username, mode: 'insensitive' } },
  });
  const formState: FormState = {
    fieldErrors: {},
    state: { type: 'login', username, password },
  };
  if (!user) {
    formState.fieldErrors!.username = 'Username does not exist';
    return badRequest(formState);
  }
  if (!user.passwordHash || getHash(password) !== user.passwordHash) {
    formState.fieldErrors!.password = 'Password is incorrect';
    return badRequest(formState);
  }
  return createUserSession(user.id, '/');
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const type = formData.get('type');
  const username = formData.get('username');
  const password = formData.get('password');

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof type !== 'string'
  ) {
    return badRequest({
      formError: 'Invalid form data',
      state: {},
    });
  }

  switch (type) {
    case 'register':
      return register(username, password);
    case 'login':
      return login(username, password);
    default:
      return badRequest({
        formError: 'Invalid type',
        state: {
          username,
          password,
        },
      });
  }
};

export default function Login() {
  const formState = useActionData<FormState>();
  const [type, setType] = useState<'register' | 'login'>('login');

  return (
    <div className="h-full flex">
      <form
        method="POST"
        className="grid basis-full md:basis-1/3 md:max-w-lg m-auto gap-1 mx-10"
      >
        <fieldset
          className="flex flex-col"
          onChange={(e) =>
            setType(
              (e.target as HTMLInputElement).value as 'register' | 'login'
            )
          }
        >
          <legend className="col-end-2 font-bold text-center text-lg">
            Login or Register?
          </legend>
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value="login"
                defaultChecked={
                  !formState?.state.type || formState.state.type === 'login'
                }
                className="peer opacity-0"
              />
              <p className="bg-purple-300 peer-checked:bg-purple-500 rounded-l-sm p-1 peer-checked:font-semibold peer-focus-within:ring ring-purple-400/50">
                Login
              </p>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value="register"
                className="peer opacity-0"
                defaultChecked={formState?.state.type === 'register'}
              />
              <p className="bg-purple-300 peer-checked:bg-purple-500 rounded-r-sm p-1 peer-checked:font-semibold peer-focus-within:ring ring-purple-400/50">
                Register
              </p>
            </label>
          </div>
        </fieldset>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            defaultValue={formState?.state.username}
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="username"
          />
          <FormErrorText>{formState?.fieldErrors?.username}</FormErrorText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            defaultValue={formState?.state.password}
            type="password"
            name="password"
            placeholder="My Password"
            autoComplete={
              type === 'login' ? 'current-password' : 'new-password'
            }
          />
          <FormErrorText>{formState?.fieldErrors?.password}</FormErrorText>
        </FormControl>
        <FormErrorText>{formState?.formError}</FormErrorText>
        <Button>Submit</Button>
      </form>
      <div className="pattern flex-grow hidden md:block" />
    </div>
  );
}
