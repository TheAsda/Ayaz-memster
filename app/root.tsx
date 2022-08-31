import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import tailwind from './styles/tailwind.css';
import app from './styles/app.css';

export function links() {
  return [
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: app },
  ];
}
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Ayaz Memster',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en" className='font-sans h-full'>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
