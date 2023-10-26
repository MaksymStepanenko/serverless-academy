const TelegramBot = require("node-telegram-bot-api");

const token = "6827974761:AAGKAXQWlVl-Ojc2KF2gUSS39DkKRv6puVk";

const bot = new TelegramBot(token, { polling: true });
