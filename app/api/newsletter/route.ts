import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 });
  // Concept project: no address is stored. Connect Mailchimp / Resend server-side for production.
  return NextResponse.json({ ok: true, concept: true, message: 'Thanks! This is a concept website, so no subscription was created.' });
}
