const { Generator } = require("../lib");
const cases = require("./sum.tc");

const tc = new Generator(cases);
const testcases = tc.gen("simple");

const { writeFileSync } = require("fs");
writeFileSync("./testcases.txt", testcases, "utf-8");
