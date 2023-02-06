import React from "react";
import { render } from "@testing-library/react";
import styled, {
    configureRules,
    styled as exportedStyled,
} from "./emotion-mirror";

const Div = (props) => <div {...props} />;

describe("src/emotion-mirror", () => {
    describe("#styled", () => {
        it("is exported", () => {
            expect(styled).toBe(exportedStyled);
        });

        describe("will warn", () => {
            let consoleWarnMock: jest.SpyInstance;

            beforeEach(() => {
                console.log(expect.getState().currentTestName);

                consoleWarnMock = jest
                    .spyOn(console, "warn")
                    .mockImplementation((message) => console.log(message));
            });

            afterEach(() => {
                expect(console.warn).toHaveBeenCalled();
                consoleWarnMock.mockReset();
            });

            it("on un-styled styled component", () => {
                const Component = styled(Div)``;

                render(<Component />);
            });

            it("on an annotation unknown styled component", () => {
                const Component = styled(Div)`
                    color: green !imprtant;
                `;

                render(<Component />);
            });

            it("on an unknown rule component", () => {
                const Component = styled(Div)`
                    @unknown {
                    }
                `;

                render(<Component />);
            });

            it("on an empty block component", () => {
                const Component = styled(Div)`
                    a {
                    }
                `;

                render(<Component />);
            });

            it("on an invalid hex component", () => {
                const Component = styled(Div)`
                    color: #z01;
                `;

                render(<Component />);
            });

            it("on an empty comment component", () => {
                const Component = styled(Div)`
                    /**/
                    /* */
                    /*

                    */
                `;

                render(<Component />);
            });

            it("on a duplicate custom property component", () => {
                const Component = styled(Div)`
                    --color: red;
                    --color: blue;
                `;

                render(<Component />);
            });

            it("on a duplicate property component", () => {
                const Component = styled(Div)`
                    color: red;
                    color: blue;
                `;

                render(<Component />);
            });

            it("on a property being overridden by shorthand property component", () => {
                const Component = styled(Div)`
                    a {
                        background-repeat: repeat;
                        background: green;
                    }
                `;

                render(<Component />);
            });

            it("on a duplicate font family component", () => {
                const Component = styled(Div)`
                    font: 1 "Arial", "Arial", sans-serif;
                    font-family: "Times", Times, serif;
                `;

                render(<Component />);
            });

            it("on a calc without spacing component", () => {
                const Component = styled(Div)`
                    width: calc(1-1);
                `;

                render(<Component />);
            });

            it("on a non-standard linear-gradient component", () => {
                const Component = styled(Div)`
                    background: linear-gradient(top, #fff, #000);
                `;

                render(<Component />);
            });

            it("on an unknown function component", () => {
                const Component = styled(Div)`
                    transform: unknown(1);
                `;

                render(<Component />);
            });

            it("on a duplicate property in keyframes component", () => {
                const Component = styled(Div)`
                    @keyframes shiftColor {
                        0% {
                            color: red;
                        }
                        0% {
                            color: green;
                        }
                        100% {
                            color: blue;
                        }
                    }
                `;

                render(<Component />);
            });

            it("on using important in keyframes component", () => {
                const Component = styled(Div)`
                    @keyframes shiftColor {
                        0% {
                            color: green !important;
                        }
                        100% {
                            color: blue;
                        }
                    }
                `;

                render(<Component />);
            });

            it("on an unknown media feature component", () => {
                const Component = styled(Div)`
                    @media screen and (unknown) {
                        width: 100%;
                    }
                `;

                render(<Component />);
            });

            it("on an invalid grid template areas component", () => {
                const Component = styled(Div)`
                    grid-template-areas:
                        "a a a"
                        "b b b b";
                `;

                render(<Component />);
            });

            it("on a duplicate selectors component", () => {
                const Component = styled(Div)`
                    .foo,
                    .bar {
                        color: blue;
                    }
                    .bar,
                    .foo {
                        width: 100%;
                    }
                `;

                render(<Component />);
            });

            it("on a double slash comment property component", () => {
                const Component = styled(Div)`
                    //color: notCommentedOut;
                `;

                render(<Component />);
            });

            it("on an irregular whitespace component", () => {
                const Component = styled(Div)`
                    color: \u200Ablue;
                `;

                render(<Component />);
            });

            it("on an unknown property component", () => {
                const Component = styled(Div)`
                    unknown: definitely;
                `;

                render(<Component />);
            });

            it("on an unknown pseudo-class component", () => {
                const Component = styled(Div)`
                    :unknown {
                        opacity: 0.5;
                    }
                `;

                render(<Component />);
            });

            it("on an unknown pseudo-element component", () => {
                const Component = styled(Div)`
                    ::pseudo {
                        content: "";
                    }
                `;

                render(<Component />);
            });

            it("on a string with a newline component", () => {
                const Component = styled(Div)`
                    content: "first
                        second";
                `;

                render(<Component />);
            });

            it("on an unknown unit component", () => {
                const Component = styled(Div)`
                    width: 100parsecs;
                `;

                render(<Component />);
            });
        });
    });

    describe("#configureRules", () => {
        it("can add rules", (done) => {
            console.log(expect.getState().currentTestName);
            configureRules({
                "property-disallowed-list": ["text-rendering"],
            });

            const consoleWarn = jest
                .spyOn(console, "warn")
                .mockImplementation((message) => console.log(message));
            const Component = styled.div`
                text-rendering: optimizeLegibility;
            `;

            render(<Component />);

            setTimeout(() => {
                expect(console.warn).toHaveBeenCalled();
                configureRules({
                    "property-disallowed-list": null,
                });
                consoleWarn.mockClear();
                done();
            });
        });

        it("can override rules", (done) => {
            configureRules({ "unit-no-unknown": null });

            const consoleWarn = jest
                .spyOn(console, "warn")
                .mockImplementation((message) => console.log(message));
            const Component = styled.div`
                width: 100parsecs;
            `;

            render(<Component />);

            setTimeout(() => {
                expect(console.warn).not.toHaveBeenCalled();
                configureRules({ "unit-no-unknown": true });
                consoleWarn.mockClear();
                done();
            });
        });
    });
});
