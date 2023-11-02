import fs from "fs/promises";
import path from "path";

const objPath = path.resolve("model", "ogj.json");

const getObj = async () => {
    const data = await fs.readFile(objPath);
  return JSON.parse(data);
};

export default getObj;