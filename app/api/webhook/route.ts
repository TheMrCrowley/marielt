import { NextResponse } from 'next/server';

import { WebhookRequest, handleAddressUpdate } from './addressHelpers';
// import initLoggerBot from './loggerBot';

// const bot = initLoggerBot();

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as WebhookRequest;

    await handleAddressUpdate(
      data,
      // bot.messageToAllMembers
    );

    return NextResponse.json({});
  } catch (e) {
    console.log(`Error in route.ts, ${JSON.stringify(e, null, 2)}`);
    // bot.members.forEach((memberId) => {
    //   bot.bot.sendMessage(memberId, `Webhook error: ${(e as Error).message}`);
    // });
  }
}
