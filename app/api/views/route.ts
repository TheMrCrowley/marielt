import { NextRequest, NextResponse } from 'next/server';

import { getUrlByType } from '@/src/helpers/apiHelpers';
import { ProductType } from '@/src/types/Product';
import { StrapiFindOneResponse } from '@/src/types/StrapiTypes';

interface RequestBody {
  updateType: 'product' | 'contacts';
  type: ProductType;
  id: string;
}

export async function POST(req: NextRequest) {
  const { id, type, updateType } = (await req.json()) as RequestBody;

  const url = `${getUrlByType(type)}/${id}`;
  const response = await fetch(url);

  const { data } = (await response.json()) as StrapiFindOneResponse<{
    page_view: number | null;
    contact_view: number | null;
  }>;

  let body: { data: { contact_view?: number; page_view?: number } } | null = null;

  if (updateType === 'contacts') {
    body = {
      data: {
        contact_view: data.attributes.contact_view ? data.attributes.contact_view + 1 : 1,
      },
    };
  } else {
    body = {
      data: {
        page_view: data.attributes.page_view ? data.attributes.page_view + 1 : 1,
      },
    };
  }

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json({});
}
