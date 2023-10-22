const readline = require("readline");

let number = [];
let words = [];

const reset = () => {
  number = [];
  words = [];
};

const sortValue = (data) => {
  const splitData = data.split(" ");
  splitData.forEach((item) => {
    if (!isNaN(item)) {
      number.push(item);
    } else {
      words.push(item);
    }
  });
};

const checkByError = (arr) => {
  if (arr.length === 0) {
    return console.log("You don't have words or number in array");
  }
};

const wordsAlphabetically = (arr) => {
  const sortArr = arr.sort((a, b) => a.localeCompare(b));
  console.log(sortArr);
};

const increaseNumbes = (arr) => {
  const sortArr = arr.sort((a, b) => a - b);
  console.log(sortArr);
};

const decreaseNumbers = (arr) => {
  const sortArr = arr.sort((a, b) => b - a);
  console.log(sortArr);
};

const wordsLength = (arr) => {
  const sortArr = arr.sort((a, b) => b.length - a.length);
  console.log(sortArr);
};

const uniqueWords = (arr) => {
  const uniqueArr = arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
  console.log(uniqueArr);
};

const uniqueAll = (numberArr, wordsArr) => {
  const arr = [...numberArr, ...wordsArr];
  const uniqueArr = arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  console.log(uniqueArr);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const game = () => {
  rl.question(
    "Hello. Enter 10 words or digits deviding them in spaces:",
    (data) => {
      sortValue(data);
      console.log(number);
      console.log(words);
      console.log("How do you like to sort the values:");
      console.log("1.Sort words alphabetically");
      console.log("2.Show numbers from lesser to greater");
      console.log("3.Show numbers from bigger to smaller");
      console.log(
        "4.Display words in ascending order by number of letters in the word"
      );
      console.log("5.Show only unique words");
      console.log("6.Unique values from the set of words and numbers");
      console.log("If you want close app enter 'exit'");
      rl.question("Choose one option (1-5) and press enter:", (value) => {
        if (value === "1") {
          checkByError(words);
          wordsAlphabetically(words);
          reset();
          game();
        } else if (value === "2") {
          checkByError(number);
          increaseNumbes(number);
          reset();
          game();
        } else if (value === "3") {
          checkByError(number);
          decreaseNumbers(number);
          reset();
          game();
        } else if (value === "4") {
          checkByError(words);
          wordsLength(words);
          reset();
          game();
        } else if (value === "5") {
          checkByError(words);
          uniqueWords(words);
          reset();
          game();
        } else if (value === "6") {
          uniqueAll(number, words);
          reset();
          game();
        } else if (value === "exit") {
          console.log("Good bye! Come back again!");
          rl.close();
        } else {
          console.log("enter corect value");
          rl.close();
        }
      });
    }
  );
};
game();
