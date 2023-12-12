import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { name: string; phone: string; id: string };

  const url = `${process.env.API_BASE_URL}/hr-apps`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: { name: body.name, phone: body.phone, type: 'академия', training: { id: body.id } },
    }),
  });

  return NextResponse.json({});
}
