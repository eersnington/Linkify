// health keep alive get endpoint
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return new NextResponse('App is alive and kicking well', {
    status: 200,
  });
}
