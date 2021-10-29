const testcases = [
    {
        name: "2 Positives (1 ~ 100000)",
        regex: /([1-9]|[1-9]\d{1,4}|100000) ([1-9]|[1-9]\d{1,4}|100000)/,
        repeat: 20,
    },
    {
        name: "2 Negatives (-1 ~ -100000)",
        regex: /(-[1-9]|-[1-9]\d{1,4}|-100000) (-[1-9]|-[1-9]\d{1,4}|-100000)/,
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

module.exports = testcases;
