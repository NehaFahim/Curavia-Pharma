import { NextResponse } from 'next/server';
const testimonials = [
  { quote: 'A future-ready pharmaceutical partner should make quality visible in every interaction.', name: 'Sample quote', role: 'Illustrative testimonial', rating: 5 },
  { quote: 'The strongest manufacturing story connects science, process and dependable execution.', name: 'Sample quote', role: 'Illustrative testimonial', rating: 5 },
  { quote: 'Premium digital presentation should make complex pharmaceutical operations easier to understand.', name: 'Sample quote', role: 'Illustrative testimonial', rating: 5 },
];
export async function GET() { return NextResponse.json({ testimonials, concept: true }); }
