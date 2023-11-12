import { NextRequest, NextResponse } from 'next/server';

import { getFlatsSearchResults } from './getFlatsSearchResults';

export async function GET(req: NextRequest) {
  const searchValue = req.nextUrl.searchParams.get('searchValue');
  const response = await getFlatsSearchResults(searchValue || '');
  return NextResponse.json(response);
}
