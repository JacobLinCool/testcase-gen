import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import { Generator, recipe, testcase, generateMode } from "./";

// get recipe and output from command line
let recipePath = join(process.cwd(), "recipe.js"),
    outputPath = join(process.cwd(), "testcases.txt"),
    mode: generateMode = "simple";
if (process.argv.findIndex((arg) => arg === "--recipe") !== -1 || process.argv.findIndex((arg) => arg === "-r") !== -1) {
    recipePath =
        process.argv[
            process.argv.findIndex((arg) => arg === "--recipe") === -1
                ? process.argv.findIndex((arg) => arg === "-r") + 1
                : process.argv.findIndex((arg) => arg === "--recipe") + 1
        ];
}
if (process.argv.findIndex((arg) => arg === "--output") !== -1 || process.argv.findIndex((arg) => arg === "-o") !== -1) {
    outputPath =
        process.argv[
            process.argv.findIndex((arg) => arg === "--output") === -1
                ? process.argv.findIndex((arg) => arg === "-o") + 1
                : process.argv.findIndex((arg) => arg === "--output") + 1
        ];
}
if (process.argv.findIndex((arg) => arg === "--mode") !== -1 || process.argv.findIndex((arg) => arg === "-m") !== -1) {
    const _mode =
        process.argv[
            process.argv.findIndex((arg) => arg === "--mode") === -1
                ? process.argv.findIndex((arg) => arg === "-m") + 1
                : process.argv.findIndex((arg) => arg === "--mode") + 1
        ];
    if (_mode === "simple" || _mode === "normal") mode = _mode;
}

if (!recipePath || !existsSync(recipePath)) {
    console.log("File path to recipe not specified or file does not exist.");
    process.exit(1);
}

const recipes: recipe[] = require(recipePath);

const generator = new Generator(recipes);

const StartTime = Date.now();
const testcases = generator.gen(mode);
const EndTime = Date.now();

if (mode === "simple") {
    writeFileSync(outputPath, testcases as string, "utf-8");
    console.log("\033[92m" + `Testcases generated in ${EndTime - StartTime}ms at ${outputPath}.` + "\033[0m");
} else {
    writeFileSync(outputPath, JSON.stringify(testcases as testcase[], null, 2), "utf-8");
    console.log("\033[92m" + `${(testcases as testcase[]).length} testcases generated in ${EndTime - StartTime}ms at ${outputPath}.` + "\033[0m");
}
