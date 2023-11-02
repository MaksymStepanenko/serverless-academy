const axios = require("axios");

//jsonbase.com
// const endpoints = [
//   "https://jsonbase.com/sls-team/json-793",
//   "https://jsonbase.com/sls-team/json-955",
//   "https://jsonbase.com/sls-team/json-231",
//   "https://jsonbase.com/sls-team/json-931",
//   "https://jsonbase.com/sls-team/json-93",
//   "https://jsonbase.com/sls-team/json-342",
//   "https://jsonbase.com/sls-team/json-770",
//   "https://jsonbase.com/sls-team/json-491",
//   "https://jsonbase.com/sls-team/json-281",
//   "https://jsonbase.com/sls-team/json-718",
//   "https://jsonbase.com/sls-team/json-310",
//   "https://jsonbase.com/sls-team/json-806",
//   "https://jsonbase.com/sls-team/json-469",
//   "https://jsonbase.com/sls-team/json-258",
//   "https://jsonbase.com/sls-team/json-516",
//   "https://jsonbase.com/sls-team/json-79",
//   "https://jsonbase.com/sls-team/json-706",
//   "https://jsonbase.com/sls-team/json-521",
//   "https://jsonbase.com/sls-team/json-350",
//   "https://jsonbase.com/sls-team/json-64",
// ];


//localhost:3000
const endpoints = [
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "http://localhost:3000/test-obj",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

const checkAllJson = async (endpoints) => {
  let trueValues = 0;
  let falseValues = 0;

  for (const endpoint of endpoints) {
    try {
      for (let retry = 0; retry < 3; retry++) {
        const response = await axios.get(endpoint);
        const data = response.data;
        const isDone = findIsDone(data);

        if (isDone === true) {
          console.log(`[Success] ${endpoint}: isDone - True`);
          trueValues++;
          break;
        } else if (isDone === false) {
          console.log(`[Success] ${endpoint}: isDone - False`);
          falseValues++;
          break;
        } else {
          if (retry === 2) {
            console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
          }
        }
      }
    } catch (error) {
      console.log(`[Fail] ${endpoint}: The endpoint is unavailable`);
    }
  }

  console.log(`Found true values: ${trueValues}`);
  console.log(`Found false values: ${falseValues}`);
};

const findIsDone = (obj) => {
  if (typeof obj === "object") {
    if ("isDone" in obj) {
      return obj.isDone;
    } else {
      for (const key in obj) {
        const result = findIsDone(obj[key]);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }
  return undefined;
};

checkAllJson(endpoints);
