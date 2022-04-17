const api = `5327918173:AAFMsqSU3tReWbX-7qowk6rTl406zHaPVF8`;
const TelegramBotApi = require("node-telegram-bot-api");

const bot = new TelegramBotApi(api, { polling: true });
const chats = [];

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
  }),
};

const againOption = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Yangidan Boshlash", callback_data: "again" }]],
  }),
};

bot.setMyCommands([
  { command: "/start", description: "hello bro" },
  { command: "/info", description: "info about me" },
  { command: "/help", description: "help" },
  { command: "/game", description: "game" },
]);

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Siz 0 dan 9 gacha son tanladim`);
  const randomNum = Math.floor(Math.random() * 10);
  chats[chatId] = randomNum;

  return bot.sendMessage(chatId, `Sonni toping?`, gameOptions);
};

const start = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name;

    const text = msg.text;

    if (text === "/start") {
      return bot.sendMessage(chatId, `Hello ${name}`);
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `I'm a bot`);
    }
    if (text === "/help") {
      return bot.sendMessage(chatId, `help my friend`);
    }
    if (text === "/game") {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, `I don't understand you`);
  });
};

bot.on("callback_query", (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  bot.sendMessage(chatId, `Siz ${data} ni tanladingiz`);
  console.log(chats[chatId]);

  if (data === "again") {
    return startGame(chatId);
  }

  if (data == chats[chatId]) {
    bot.sendSticker(
      chatId,
      `https://tgram.ru/wiki/stickers/img/LiveFlowers/gif/6.gif`
    );
    bot.sendMessage(chatId, `Tabriklayman Siz Topdingiz ${chats[chats]} `);
  } else {
    bot.sendSticker(
      chatId,
      `https://tgram.ru/wiki/stickers/img/LiveFlowers/gif/1.gif`
    );
    bot.sendMessage(
      chatId,
      `Afsuski Topolmadingiz! To'g'ri Javob ${chats[chats]}`,
      againOption
    );
  }
});

start();
