import csv from "csv-parser";
import fs from "fs";
import path from "path";
import files from "csvtojson";
import excel from "convert-excel-to-json";

function getPathdirectory(paths: string[], count: number) {
  const files = paths.map((filePath) => {
    return path.parse(filePath);
  });
  files.forEach((parsedPath) => {
    if (parsedPath.ext === ".csv") {
      const filepath: string = path.join(
        __dirname,
        `../input/${parsedPath.base}`
      );
      analyseCsv(filepath, count);
    } else if (parsedPath.ext === ".xls" || parsedPath.ext === ".xlsx") {
      const filepath: string = path.join(
        __dirname,
        `../input/${parsedPath.base}`
      );
      analyseExel(filepath, count);
    }
  });
}

async function analyseCsv(filePath: string, count: number) {
  let chunks: string[] = [];

  chunks = await files().fromFile(filePath);

  let maxCount: number = count;

  for (let index: number = 0; index < chunks.length; index++) {
    let batchs: string[];
    batchs = await chunks.slice(index, maxCount);

    index += count;
    maxCount += count;
    const outputPath: string = path.join(
      __dirname,
      `../csvOutput/${index}.json`
    );
    const jsonFile: string = JSON.stringify(batchs, null, 2);

    fs.writeFileSync(outputPath, jsonFile);
  }
}

async function analyseExel(filePath: string, count: number) {
  const data = await excel({
    sourceFile: filePath,
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });
  let chunks: Record<string, any> = Object.entries(data);
  let maxCount: number = count;

  for (let index: number = 0; index < chunks.length; index++) {
    let batchs: string[];
    batchs = await chunks.slice(index, maxCount);
    index += count;
    maxCount += count;
    const outputPath: string = path.join(
      __dirname,
      `../excelOutputs/${index}.json`
    );
    const jsonFile: string = JSON.stringify(batchs, null, 2);

    fs.writeFileSync(outputPath, jsonFile);
  }
}

//Passing multiple Inputs
getPathdirectory(["500000 Records.csv", "sample-xls-file-for-testing.xls"], 999);

export default {
    analyseCsv,
    analyseExel
}