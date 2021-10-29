import RandExp from "randexp";
import { recipe, testcase, generateMode, testcaseGenerator } from "./types";

class Generator {
    recipes: recipe[] = [];

    constructor(testcases: any[] = []) {
        if (testcases.length) this.load(testcases);
    }

    public load(testcases: any[]) {
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
            if (rc.regex) tc += new RandExp(rc.regex).gen().trim();
            else if (rc.generator) tc += rc.generator().trim();
            else if (rc.text) tc += rc.text.trim();
            else continue;
            tc += "\n\n";
        }

        return { id, name, testcase: tc };
    }
}

export default Generator;
