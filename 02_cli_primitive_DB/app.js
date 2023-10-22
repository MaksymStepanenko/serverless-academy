import inquirer from "inquirer";
import fs from "fs/promises";
const DBPath = "DB.txt";

let user = [];
fs.readFile(DBPath, "utf-8")
  .then((data) => {
    user = JSON.parse(data);
    return appDB();
  })
  .catch((error) => {
    console.log("Your user list clean");
    return appDB();
  });

const searchUser = async () => {
  const searchByName = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter user name you wanna find in DB:",
    },
  ]);

  const value = searchByName.name;
  const findUser = user.find((user) => user.name === value);
  if (findUser) {
    console.log(`user ${value} was found`);
    console.log(findUser);
  } else {
    console.log(`user ${value} not found`);
  }

  return;
};

const searchValue = async () => {
  const showJSON = await inquirer.prompt([
    {
      type: "confirm",
      name: "DB",
      message: "Would you to search value in DB?",
    },
  ]);

  if (showJSON.DB) {
    const readFile = await fs.readFile(DBPath, "utf-8");
    const jsonReadFile = JSON.parse(readFile);
    console.log(jsonReadFile);
    searchUser();
    return;
  } else {
    console.log("Thanks for using app! Come back!");
    return;
  }
};

const appDB = async () => {
  const createUserName = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the user's name. To cancel press ENTER",
    },
  ]);
  if (createUserName.name === "") {
    searchValue();
    return;
  }

  const createUser = await inquirer.prompt([
    {
      type: "list",
      name: "gender",
      message: "Choose Gender",
      choices: ["male", "female"],
    },
    {
      type: "input",
      name: "age",
      message: "Enter the user's age.",
    },
  ]);

  const userObj = {
    name: createUserName.name,
    gender: createUser.gender,
    age: createUser.age,
  };

  user.push(userObj);

  const jsonData = JSON.stringify(user, null, 2);
  await fs.writeFile(DBPath, jsonData);

  appDB();
};
