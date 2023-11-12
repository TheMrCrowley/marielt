import { NextRequest, NextResponse } from 'next/server';

import { ProductType } from '@/src/types/Product';

import { getFlatsSearchResults } from './getFlatsSearchResults';

export async function GET(req: NextRequest) {
  const searchValue = req.nextUrl.searchParams.get('searchValue');
  const type = req.nextUrl.searchParams.get('type') as ProductType;
  const response = await getFlatsSearchResults(searchValue || '', type);
  return NextResponse.json(response);
}
