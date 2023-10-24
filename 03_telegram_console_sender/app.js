const TelegramBot = require("node-telegram-bot-api");
const { Command } = require("commander");

const token = "0";
const chatId = 0

const program = new Command();
const bot = new TelegramBot(token, { polling: true });

program
  .name("node app.js")
  .description("This app send messages and photos from the console to Telegram")
  .version("0.0.1");

program
  .command("m <message>")
  .description("/Send message/ enter in console:   node app.js m 'your_message'")
  .action(async (string) => {
    await bot.sendMessage(chatId, string);
    process.exit();
  });

program
  .command("p <photo>")
  .description("/Send message/ enter in console:   node app.js p '/path/to/photo.png'")
  .action(async (photo) => {
    await bot.sendPhoto(chatId, photo);
    process.exit();
  });

program.parse(process.argv);
