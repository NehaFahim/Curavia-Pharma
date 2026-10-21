import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '').trim();
  const honeypot = String(form.get('website') || '').trim();
  const file = form.get('file');
  if (honeypot) return NextResponse.json({ ok: true, message: 'Received.' });
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 });
  if (file instanceof File && file.size > 5 * 1024 * 1024) return NextResponse.json({ ok: false, message: 'Attachment must be 5MB or smaller.' }, { status: 400 });
  // Concept project: nothing is stored or emailed. Plug in Nodemailer / Resend here for a live site.
  return NextResponse.json({ ok: true, concept: true, message: 'Thanks! This is a concept website, so your enquiry was validated but not stored or sent.' });
}
