const { writeFileSync } = require("fs");
const { Generator } = require("../lib");

const cases = require("./sum.tc");

const tc = new Generator();
tc.load(cases);
const generated = tc.gen("simple");

writeFileSync("./testcases.txt", generated, "utf-8");
