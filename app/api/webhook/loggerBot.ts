import TelegramApi from 'node-telegram-bot-api';

interface Command {
  command: string;
  description: string;
  action: () => void;
}

const commands: Command[] = [
  {
    command: '/add',
    description: 'Добавить меня в рассылку',
    action: () => {},
  },
  {
    command: '/remove',
    description: 'Убрать меня из рассылки',
    action: () => {},
  },
];

const initLoggerBot = () => {
  const members = new Set<number>();
  let bot = new TelegramApi(process.env.TELEGRAM_LOGGER_BOT_TOKEN as string, {
    polling: true,
  });

  bot.setMyCommands(commands.map(({ command, description }) => ({ command, description })));

  bot.once('polling_error', async (err) => {
    await bot.sendMessage(696294223, JSON.stringify(err));
    await bot.close();
    bot = new TelegramApi(process.env.TELEGRAM_LOGGER_BOT_TOKEN as string, {
      polling: true,
    });
  });

  bot.onText(/\/add/, async (msg) => {
    if (members.has(msg.chat.id)) {
      return bot.sendMessage(msg.chat.id, 'Вы уже в списке на рассылку');
    }
    members.add(msg.chat.id);
    return bot.sendMessage(msg.chat.id, 'Вы были добавлены в рассылку логов от вебхука');
  });

  bot.onText(/\/remove/, async (msg) => {
    if (members.has(msg.chat.id)) {
      members.delete(msg.chat.id);
      return bot.sendMessage(msg.chat.id, 'Вы были исключены из рассылки логов от вебхука');
    }
    return bot.sendMessage(msg.chat.id, 'Вас нет в списке на рассылку');
  });

  return {
    members,
    bot,
    messageToAllMembers: (message: string) =>
      members.forEach((memberId) => {
        bot.sendMessage(memberId, message);
      }),
  };
};

export default initLoggerBot;
