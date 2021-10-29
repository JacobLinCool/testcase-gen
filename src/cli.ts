import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import { Generator, recipe, testcase, generateMode } from "./";

if (
    process.argv.findIndex((arg) => arg === "--version") !== -1 ||
    process.argv.findIndex((arg) => arg === "-v") !== -1 ||
    process.argv.findIndex((arg) => arg === "-V") !== -1
) {
    console.log("testcase-gen version: " + "\u001b[1;93m" + require("../package.json").version + "\u001b[0m");
    console.log("Usage: testcase-gen --recipe [recipe] --output [output] --mode [mode]");
    console.log("\t--recipe (-r): Recipe JS File Path.");
    console.log("\t--output (-o): Output File Path.");
    console.log('\t--mode (-m): Generate Mode. "simple" or "normal".');
    console.log("\t--version (-V) or (-v): Show version.");
    console.log("Homepage: " + "\u001b[94m" + require("../package.json").homepage + "\u001b[0m");
    process.exit(0);
}

let recipePath = join(process.cwd(), "recipe.js"),
    outputPath = "",
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
    if (!outputPath) outputPath = join(process.cwd(), "testcases.txt");
    writeFileSync(outputPath, testcases as string, "utf-8");
    console.log("\u001b[92m" + `Testcases generated in ${EndTime - StartTime}ms at ${outputPath}.` + "\u001b[0m");
} else {
    if (!outputPath) outputPath = join(process.cwd(), "testcases.json");
    writeFileSync(outputPath, JSON.stringify(testcases as testcase[], null, 2), "utf-8");
    console.log("\u001b[92m" + `${(testcases as testcase[]).length} testcases generated in ${EndTime - StartTime}ms at ${outputPath}.` + "\u001b[0m");
}
