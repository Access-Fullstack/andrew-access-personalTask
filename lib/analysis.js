"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const convert_excel_to_json_1 = __importDefault(require("convert-excel-to-json"));
function getPathdirectory(paths) {
    const files = paths.map((filePath) => {
        return path_1.default.parse(filePath);
    });
    files.forEach((parsedPath) => {
        if (parsedPath.ext === ".csv") {
            const filepath = path_1.default.join(__dirname, `../input/${parsedPath.base}`);
            analyseCsv(filepath);
        }
        else if (parsedPath.ext === ".xls" || parsedPath.ext === ".xlsx") {
            const filepath = path_1.default.join(__dirname, `../input/${parsedPath.base}`);
            analyseExel(filepath);
        }
    });
}
async function analyseCsv(filePath) {
    let chunks = [];
    chunks = await csvtojson_1.default().fromFile(filePath);
    let maxCount = 999;
    for (let index = 0; index < chunks.length; index++) {
        let batchs;
        batchs = await chunks.slice(index, maxCount);
        index += 999;
        maxCount += 999;
        const outputPath = path_1.default.join(__dirname, `../csvOutput/${index}.json`);
        const jsonFile = JSON.stringify(batchs, null, 2);
        fs_1.default.writeFileSync(outputPath, jsonFile);
    }
}
async function analyseExel(filePath) {
    const data = await convert_excel_to_json_1.default({
        sourceFile: filePath,
        columnToKey: {
            "*": "{{columnHeader}}",
        },
    });
    let chunks = Object.entries(data);
    let maxCount = 999;
    for (let index = 0; index < chunks.length; index++) {
        let batchs;
        batchs = await chunks.slice(index, maxCount);
        index += 999;
        maxCount += 999;
        const outputPath = path_1.default.join(__dirname, `../excelOutputs/${index}.json`);
        const jsonFile = JSON.stringify(batchs, null, 2);
        fs_1.default.writeFileSync(outputPath, jsonFile);
    }
}
//Passing multiple Inputs
getPathdirectory(["500000 Records.csv", "sample-xls-file-for-testing.xls"]);
