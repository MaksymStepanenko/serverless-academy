const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const { Markup } = require("node-telegram-bot-api");

const chatId = 0;
const botToken = "";


const API = "http://api.openweathermap.org/data/2.5/forecast?limit=5&id=703448";
const CITY = "Kyiv";
const API_KEY = "c84f6cbf5b1f4410e6d8e105314655ab";
const THREE_HOURS = 3 * 60 * 1000;
const SIX_HOURS = 6 * 60 * 1000;

const bot = new TelegramBot(botToken, { polling: true });

bot.on("message", (msg) => {
  if (msg.text === "Forecast in Nice") {
    bot.sendMessage(chatId, "Please choose intervals weather forecasts", {
      reply_markup: {
        keyboard: [
          [{ text: "at intervals of 3 hours" }],
          [{ text: "at intervals of 6 hours" }],
        ],
      },
    });
  } else if (msg.text === "at intervals of 3 hours") {
    bot.sendMessage(chatId, "weather in Kyiv", weatherInterval(THREE_HOURS));
  } else if (msg.text === "at intervals of 6 hours") {
    bot.sendMessage(chatId, "weather in Kyiv", weatherInterval(SIX_HOURS));
  } else {
    bot.sendMessage(
      chatId,
      "Hello, I am a Telegram bot that can send weather forecasts in Kyiv",
      {
        reply_markup: {
          keyboard: [[{ text: "Forecast in Nice" }]],
        },
      }
    );
  }
});
const weatherInterval = (time) => {
  getWeather();
  setInterval(() => {
    getWeather();
  }, time);
};

const getWeather = () => {
  axios
    .get(`${API}?limit=5&id=703448&q=${CITY}&appid=${API_KEY}`)
    .then((response) => {
      const result = response.data.list[0];
      const weather = result.main;
      const time = result.dt_txt;
      const message = {
        weather,
        weather_time: time,
      };
      const messageJSON = JSON.stringify(message, null, 2);
      bot.sendMessage(chatId, messageJSON);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
