import { NextRequest, NextResponse } from 'next/server';

import { ApplicationFormType } from '@/src/enums/ApplicationForm';

import { getApplicationType, getApplicationUrl } from './applicationHelpers';

interface RequestBody {
  name: string;
  phone: string;
  type: ApplicationFormType;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RequestBody;

  const url = getApplicationUrl(body.type);

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: { name: body.name, phone: body.phone, type: getApplicationType(body.type) },
    }),
  });

  return NextResponse.json({});
}
