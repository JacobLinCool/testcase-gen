export type generateMode = "simple" | "normal";
export type testcaseGenerator = () => string;

export interface recipe {
    name: string | null;
    regex: RegExp | null;
    generator: testcaseGenerator | null;
    text: string | null;
    repeat: number;
}

export interface testcase {
    id: number;
    name: string;
    testcase: string;
}
