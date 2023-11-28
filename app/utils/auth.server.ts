import { OAuth2Strategy } from 'remix-auth-oauth2';
import { storage } from './session.server';
import { Authenticator, AuthorizationError } from 'remix-auth';
import { db } from './db.server';

export type SessionUser = {
  username: string;
};

export const authenticator = new Authenticator<SessionUser>(storage);

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId) {
  throw new Error('Client ID is not provided');
}
if (!clientSecret) {
  throw new Error('Client Secret is not provided');
}

authenticator.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://discord.com/api/oauth2/authorize',
      tokenURL: 'https://discord.com/api/oauth2/token',
      clientID: clientId,
      clientSecret: clientSecret,
      // TODO: change to env
      callbackURL: 'http://localhost:3000/auth/discord',
      scope: 'identify email guilds',
    },
    async ({ accessToken, extraParams, profile }) => {
      const authorization = `${extraParams.token_type} ${accessToken}`;
      const { email, username } = await getProfile(authorization);
      const isOnServer = await checkServer(authorization);

      let user = await db.user.findFirst({
        where: {
          email: { equals: email },
        },
        select: {
          username: true,
          isOnServer: true,
        },
      });

      if (user === null) {
        user = await db.user.create({
          data: {
            username,
            email,
            canAccess: true,
            isOnServer: isOnServer,
            canEdit: false,
            isAdmin: false,
          },
          select: {
            username: true,
            isOnServer: true,
          },
        });
      } else if (user.isOnServer !== isOnServer) {
        user = await db.user.update({
          where: {
            email,
          },
          data: {
            isOnServer,
          },
          select: {
            username: true,
            isOnServer: true,
          },
        });
      }
      if (!user.isOnServer) {
        throw new AuthorizationError('You must on server to get access');
      }

      const sessionUser: SessionUser = {
        username: user.username,
      };

      return sessionUser;
    }
  ),
  'Discord'
);

const getProfile = async (authorization: string) => {
  const res = await fetch('https://discord.com/api/users/@me', {
    headers: { authorization },
  });
  const data: { id: string; global_name: string; email: string } =
    await res.json();
  return { email: data.email, username: data.global_name };
};

const SERVER_ID = '400230889453518848';
const checkServer = async (authorization: string) => {
  const res = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: { authorization },
  });
  const data: { id: string }[] = await res.json();
  return data.find((item) => item.id === SERVER_ID) !== undefined;
};
