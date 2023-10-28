const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const botToken = "6827974761:AAHzFsmGyEt4UMbP0aztHT3pagUEdsknvhg";

const API_MONO = "https://api.monobank.ua/bank/currency";

const API = "http://api.openweathermap.org/data/2.5/forecast?limit=5&id=703448";
const CITY = "Kyiv";
const API_KEY = "c84f6cbf5b1f4410e6d8e105314655ab";
const THREE_HOURS = 3 * 60 * 1000;
const SIX_HOURS = 6 * 60 * 1000;

const bot = new TelegramBot(botToken, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === "weather") {
    bot.sendMessage(chatId, "Please choose intervals weather forecasts", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "at intervals of 3 hours",
            },
            {
              text: "at intervals of 6 hours",
            },
          ],
          [{ text: "back" }],
        ],
      },
    });
  } else if (msg.text === "at intervals of 3 hours") {
    bot.sendMessage(chatId, "weather in Kyiv");
    weatherInterval(THREE_HOURS, chatId);
  } else if (msg.text === "at intervals of 6 hours") {
    bot.sendMessage(chatId, "weather in Kyiv");
    weatherInterval(SIX_HOURS, chatId);
  } else if (msg.text === "USD") {
    bot.sendMessage(chatId, "USD");
    getUSD(chatId);
  } else if (msg.text === "EUR") {
    bot.sendMessage(chatId, "EUR");
    getEUR(chatId);
  } else if (msg.text === "exchange rate") {
    bot.sendMessage(chatId, "Please choose currency", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "USD",
            },
            {
              text: "EUR",
            },
          ],
          [{ text: "back" }],
        ],
      },
    });
  } else if (msg.text === "back") {
    bot.sendMessage(
      chatId,
      "Hello, I am a Telegram bot that can send weather forecasts in Kyiv and send exchange rate",
      {
        reply_markup: {
          keyboard: [[{ text: "weather" }], [{ text: "exchange rate" }]],
        },
      }
    );
  } else {
    bot.sendMessage(
      chatId,
      "Hello, I am a Telegram bot that can send weather forecasts in Kyiv and send exchange rate",
      {
        reply_markup: {
          keyboard: [[{ text: "weather" }], [{ text: "exchange rate" }]],
        },
      }
    );
  }
});
const weatherInterval = (time, chatId) => {
  getWeather(chatId);
  setInterval(() => {
    getWeather(chatId);
  }, time);
};

const getWeather = (chatId) => {
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

const getUSD = (chatId) => {
  axios
    .get(API_MONO)
    .then((response) => {
      const data = response.data;
      const filterValue = [
        { currencyCodeA: 840, currencyCodeB: 980 },
        { currencyCodeA: 978, currencyCodeB: 980 },
      ];
      const filteredData = data.filter((item) => {
        return filterValue.some((target) => {
          return (
            item.currencyCodeA === target.currencyCodeA &&
            item.currencyCodeB === target.currencyCodeB
          );
        });
      });
      const buyUSD = filteredData[0].rateBuy;
      myCache.set("buyUSD", buyUSD);
      const sellUSD = filteredData[0].rateSell;
      myCache.set("sellUSD", sellUSD);
      const buyEUR = filteredData[1].rateBuy;
      myCache.set("buyEUR", buyEUR);
      const sellEUR = filteredData[1].rateSell;
      myCache.set("sellEUR", sellEUR);

      const message = `${buyUSD}/${sellUSD}`;
      bot.sendMessage(chatId, message);
    })
    .catch((error) => {
      console.error(error.message);
      const cacheBuyUSD = myCache.get("buyUSD");
      const cacheSellUSD = myCache.get("sellUSD");
      const message = `${cacheBuyUSD}/${cacheSellUSD}`;
      bot.sendMessage(chatId, message);
    });
};

const getEUR = (chatId) => {
  axios
    .get(API_MONO)
    .then((response) => {
      const data = response.data;
      const filterValue = [
        { currencyCodeA: 840, currencyCodeB: 980 },
        { currencyCodeA: 978, currencyCodeB: 980 },
      ];
      const filteredData = data.filter((item) => {
        return filterValue.some((target) => {
          return (
            item.currencyCodeA === target.currencyCodeA &&
            item.currencyCodeB === target.currencyCodeB
          );
        });
      });
      const buyUSD = filteredData[0].rateBuy;
      myCache.set("buyUSD", buyUSD);
      const sellUSD = filteredData[0].rateSell;
      myCache.set("sellUSD", sellUSD);
      const buyEUR = filteredData[1].rateBuy;
      myCache.set("buyEUR", buyEUR);
      const sellEUR = filteredData[1].rateSell;
      myCache.set("sellEUR", sellEUR);

      const message = `${buyEUR}/${sellEUR}`;
      bot.sendMessage(chatId, message);
    })
    .catch((error) => {
      console.error(error.message);
      const cacheBuyEUR = myCache.get("buyEUR");
      const cacheSellEUR = myCache.get("sellEUR");
      const message = `${cacheBuyEUR}/${cacheSellEUR}`;
      bot.sendMessage(chatId, message);
    });
};