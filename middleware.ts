import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl;
  console.log('url', url);

  // Get hostname of request (e.g. sree.linkifyme.pro, sree.localhost:3000)
  let hostname = req.headers
    .get('host')!
    .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  console.log('hostname', hostname);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes('---') &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  console.log('Path: ', path);

  // rewrite root application to `/home` folder
  if (
    hostname === 'localhost:3000' ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    console.log('Rewriting to /home');
    return NextResponse.rewrite(
      new URL(`/home${path === '/' ? '' : path}`, req.url)
    );
  }

  // rewrite everything else to `/[domain] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
