import { NextRequest, NextResponse } from 'next/server';

import {
  AgentFormRequestBody,
  getAgentApplicationUrl,
  getAgentFormBodyByType,
} from './agentApplicationHelpers';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AgentFormRequestBody;

  const url = getAgentApplicationUrl(body.type);

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: getAgentFormBodyByType(body),
  });

  return NextResponse.json({});
}
