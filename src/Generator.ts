import RandExp from "randexp";
import { recipe, testcase, generateMode, testcaseGenerator } from "./types";

class Generator {
    recipes: recipe[] = [];

    constructor(testcases: testcase[] = []) {
        if (testcases.length) this.load(testcases);
    }

    public load(testcases: testcase[]) {
        this.recipes = testcases.map((tc) => {
            return Object.assign({ name: null, regex: null, generator: null, text: null, repeat: 1 }, tc);
        });
        return this;
    }

    public gen(mode: generateMode = "normal") {
        const testcases: testcase[] = [];
        for (let i = 0; i < this.recipes.length; i++) testcases.push(this.genTestcase(this.recipes[i], i));

        if (mode == "normal") return testcases;
        else if (mode == "simple") return testcases.reduce((acc, cur) => acc + cur.testcase, "");
    }

    private genTestcase(rc: recipe, id: number = 0): testcase {
        const name = rc.name || "Case " + id.toString();

        let tc = "";
        for (let i = 0; i < rc.repeat; i++) {
            if (typeof rc.generator === "function") tc += rc.generator().trim();
            else if (rc.regex instanceof RegExp) tc += new RandExp(rc.regex).gen().trim();
            else if (typeof rc.text === "string") tc += rc.text.trim();
            else continue;
            tc += "\n\n";
        }

        return { id, name, testcase: tc };
    }
}

export default Generator;
