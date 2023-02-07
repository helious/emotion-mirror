import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, Global } from "@emotion/react";
import styled, { configureRules } from "./src/emotion-mirror";

declare module "@emotion/react" {
    export interface Theme {
        color: string;
    }
}

const Screen = styled.div`
    background: black;
    color: white;
    height: 100%;
`;

const App: React.FC = () => {
    const [styles, setStyles] = useState<string>(`
        background: gray;
        box-sizing: border-box;
        color: black;
        font-family: Roboto, sans-serif;
        font-size: 24px;
        height: 100%;
        padding: 20px;
        width: 100%;
    `);
    const Component = styled.div(styles);
    const [stylelineRules, setStylelintRules] = useState<{
        [key: string]: true | string[] | null;
    }>({
        "unit-allowed-list": ["%", "px"],
    });
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [warnings, setWarnings] = useState<string[]>([]);
    const warnWarningsPromise = useRef(getEmptyWarningsPromise());

    useEffect(() => {
        configureRules(stylelineRules);

        warnWarningsPromise.current = getEmptyWarningsPromise();
    }, [stylelineRules]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.value = styles;
        }

        warnWarningsPromise.current = getEmptyWarningsPromise();
    }, [styles]);

    useEffect(() => {
        const debouncedSetWarnings = debounce(setWarnings, 1);
        const { warn } = console;

        console.warn = (message) => {
            warnWarningsPromise.current.then((warnings) => {
                warnings.push(message);
                debouncedSetWarnings(warnings);

                return warnings;
            });
            warn(message);
        };

        return () => {
            console.warn = warn;
        };
    }, []);

    return (
        <ThemeProvider theme={{ color: "RebeccaPurple" }}>
            <Global
                styles={{
                    "*": { margin: 0, padding: 0 },
                    "body, html, #app": { background: 'black', height: "100%", width: "100%" },
                }}
            />
            <Screen>
                <SplitLayout>
                    <div>
                        <Component>Rendered Styled Component</Component>
                    </div>
                    <div>
                        <StylelintRules>
                            <h2>Stylelint Rules</h2>
                            {Object.entries(stylelineRules).map(
                                ([rule, value], index) => (
                                    <li key={index}>
                                        {rule}:{" "}
                                        <input
                                            onChange={({
                                                target: { value },
                                            }) => {
                                                setStylelintRules(
                                                    (stylelintRules) => ({
                                                        ...stylelintRules,
                                                        [rule]: value.split(
                                                            ","
                                                        ),
                                                    })
                                                );
                                                setWarnings([]);
                                                setTimeout(() => {
                                                    warnWarningsPromise.current = getEmptyWarningsPromise();

                                                    setStyles(styles);
                                                });
                                            }}
                                            type="text"
                                            value={
                                                typeof value === "object"
                                                    ? value?.join(",")
                                                    : ""
                                            }
                                        />
                                    </li>
                                )
                            )}
                        </StylelintRules>
                        <StylesTextarea
                            onKeyDown={(event) => {
                                const { shiftKey, which } = event;

                                if (textareaRef.current && which === 9) {
                                    const {
                                        current: textareaElement,
                                    } = textareaRef;
                                    const {
                                        selectionStart = 0,
                                    } = textareaElement;
                                    const tabSize = 4;
                                    const tabString = Array(tabSize + 1).join(
                                        " "
                                    );

                                    event.preventDefault();

                                    if (shiftKey) {
                                        if (
                                            styles.substr(
                                                selectionStart - tabSize,
                                                tabSize
                                            ) === tabString
                                        ) {
                                            textareaElement.value = `${styles.substr(
                                                0,
                                                selectionStart - tabSize
                                            )}${styles.substr(selectionStart)}`;
                                            textareaElement.setSelectionRange(
                                                selectionStart - tabSize,
                                                selectionStart - tabSize
                                            );
                                        }
                                    } else {
                                        textareaElement.value = `${styles.substr(
                                            0,
                                            selectionStart
                                        )}${tabString}${styles.substr(
                                            selectionStart
                                        )}`;
                                        textareaElement.setSelectionRange(
                                            selectionStart + tabSize,
                                            selectionStart + tabSize
                                        );
                                    }

                                    setTimeout(() => {
                                        setStyles(textareaElement.value);
                                    });
                                }
                            }}
                            onChange={({ target: { value } }) => {
                                setStyles(value);
                                setWarnings([]);
                            }}
                            ref={textareaRef}
                            value={textareaRef.current?.value}
                        />
                        {warnings.length > 0 && (
                            <Warnings>
                                {warnings.map((warning, index) => (
                                    <Warning key={index}>{warning}</Warning>
                                ))}
                            </Warnings>
                        )}
                    </div>
                </SplitLayout>
            </Screen>
        </ThemeProvider>
    );
};

const SplitLayout = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 20px;
    height: 100%;
    padding: 20px;

    > div {
        box-sizing: border-box;
        height: 100%;
        overflow: auto;
        width: 100%;
    }
`;

const StylelintRules = styled.ul`
    list-style: none;
    margin-bottom: 20px;
    max-height: 25%;
    overflow-y: auto;
`;

const StylesTextarea = styled.textarea`
    border: none;
    border-radius: 8px;
    box-sizing: border-box;
    height: 25%;
    margin-bottom: 20px;
    outline: none;
    width: 100%;
`;

const Warning = styled.li`
    background: #322808;
    border-bottom: 1px solid #635617;
    color: #e7ad47;
    font-size: 11px;
    padding: 3px 8px 1px;
    white-space: pre-line;
`;

const Warnings = styled.ul`
    border-top: 1px solid #635617;
    font-family: menlo, monospace;
    list-style: none;
    max-height: 50%;
    overflow-y: auto;
`;

ReactDOM.render(<App />, document.getElementById("app"));

function debounce(functionToDebounce, timeout = 0) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            functionToDebounce.apply(null, args);
        }, timeout);
    };
}

function getEmptyWarningsPromise() {
    return new Promise<string[]>((resolve) => resolve([]));
}
