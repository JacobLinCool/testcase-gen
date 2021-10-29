# Testcase Generator

Generate testcases by simple but highly customizable rules.

 [![NPM](https://img.shields.io/npm/v/testcase-gen.svg?style=flat)](https://www.npmjs.com/package/testcase-gen)

## Usage

### Install

```bash
npm i testcase-gen
```

### Generate Testcases by Rules

For example: sum of two numbers.

```javascript
const { Generator } = require("testcase-gen");

const rules = [
    {
        name: "2 Positives (1 ~ 99999)",
        regex: /[1-9]\d{0,4} [1-9]\d{0,4}/,
        repeat: 20,
    },
    {
        name: "2 Negatives (-1 ~ -99999)",
        regex: /-[1-9]\d{0,4} -[1-9]\d{0,4}/,
        repeat: 20,
    },
    {
        name: "1 Zero, 1 Positive (1 ~ 100000)",
        generator: () => `0 ${1 + Math.floor(Math.random() * 100000)}`,
        repeat: 10,
    },
    {
        name: "1 Zero, 1 Negative (-1 ~ -100000)",
        generator: function () {
            return `0 -${1 + Math.floor(Math.random() * 100000)}`;
        },
        repeat: 10,
    },
    {
        name: "2 Zero",
        text: "0 0",
    },
];

const generator = new Generator(rules);
console.log(generator.gen());
```

## Rules

Each rule must have one of the following properties: `generator` or `regex` or `text`.

And the following properties are optional: `name`, `repeat`.

### 3 Ways to Generate Testcases

There are 3 ways to generate testcases: **Generator Function**, **Regex** and **Text**.

The order of rule applying is:

1. Generator Function
2. Regex
3. Text

> I recommand you to use Generator Function because it is more flexible.
