import path from "path";
import fs from "fs/promises";
import { checkExtension } from "./helpers/checkExtension.js";

import { validateData } from "./helpers/validateData.js";

export const createFile = async (fileName, content) => {
  const file = { fileName, content };

  const checkData = validateData(file);
  if (checkData.error) {
    console.log(
      `Please specify ${checkData.error.details[0].path[0]} parametr`
    );

    return;
  }
  //   console.log(checkData.error.details[0]);

  //   const resultCheckExtension = checkExtension(fileName);
  //   console.log(resultCheckExtension);

  const { extension, result } = checkExtension(fileName);
  if (!result) {
    console.log(`Sorry, this APP doesn't support ${extension} extension`);
    return;
  }

  const filePath = path.resolve("files", fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log("File was created succesfully!");
  } catch (error) {
    console.log(error);
  }
};

export const getFiles = async () => {
  const pathFolder = path.resolve("files");
  try {
    const files = await fs.readdir(pathFolder);
    if (!files.length) {
      console.log("Sorry, there is no files in this DIR...");
      return;
    }
    files.forEach((file) => console.log(file));
  } catch (error) {}
};

export const getFileInfo = async (fileName) => {
  const folderPath = path.resolve("files");
  try {
    const files = await fs.readdir(folderPath);
    if (!files.includes(fileName)) {
      console.log(`Sorry, there is no file named ${fileName}`);
      return;
    }
    const pathToFile = path.resolve("files", fileName);

    const fileData = await fs.readFile(pathToFile, "utf-8");
    const createdAt =(await fs.stat(pathToFile)).birthtime.toString();
    const extName = path.extname(fileName);
    const file = path.basename(fileName, extName);
    console.table({ fileData, createdAt, file, extName });
  } catch (error) {
    console.log(error.message);
  }
};
