import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const event = await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, received: { event: event?.event || 'unknown' }, concept: true });
}
