import { NextResponse } from 'next/server';
const supported = ['en','ar','fr'];
export async function GET(request: Request) { const lang = new URL(request.url).searchParams.get('lang') || 'en'; return NextResponse.json({ language: supported.includes(lang) ? lang : 'en', supported, concept: true, message: 'Translation dictionaries can be connected here.' }); }
