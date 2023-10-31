const fs = require("fs");

const files = [
  "data/out0.txt",
  "data/out1.txt",
  "data/out2.txt",
  "data/out3.txt",
  "data/out4.txt",
  "data/out5.txt",
  "data/out6.txt",
  "data/out7.txt",
  "data/out8.txt",
  "data/out9.txt",
  "data/out10.txt",
  "data/out11.txt",
  "data/out12.txt",
  "data/out13.txt",
  "data/out14.txt",
  "data/out15.txt",
  "data/out16.txt",
  "data/out17.txt",
  "data/out18.txt",
  "data/out19.txt",
];
const allName = [];

console.time("time");

const uniqueValues = (arr) => {
  const uniqueArr = [...new Set(arr)];

  return console.log("uniqueValues--->", uniqueArr.length);
};
const existInAllFiles = (arr) => {
  let count = 0;

  arr.forEach((name) => (count += [...new Set(name)].length));
  return console.log("existInAllFiles--->", count);
};

const existInAtleastTen = (arr, nameCount) => {
  let count = 0;
  const ifNameCount = nameCount >= 10 ? nameCount : 10;
  arr.forEach((name, i) => {
    if (i + 1 > ifNameCount) {
      return;
    }
    count += [...new Set(name)].length;
  });

  return console.log("existInAtleastTen--->", count);
};

try {
  files.forEach((file) => {
    const readTxt = fs.readFileSync(file, "utf-8");
    const arr = readTxt.split("\n");
    const data = arr.map((item) => {
      return item.trim();
    });
    allName.push(...data);
  });
} catch (error) {
  console.error(error.message);
}

uniqueValues(allName);
existInAtleastTen(allName, 10);
existInAllFiles(allName);

console.timeEnd("time");
// uniqueValues(); // returns 1234
// existInAllFiles(); // returns 42
// existInAtleastTen(); // returns 50
