import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, Global } from "@emotion/react";
import styled, { configureRules } from "./src/emotion-mirror";

configureRules({
    "unit-allowed-list": ["%", "px"],
});

declare module "@emotion/react" {
    export interface Theme {
        color: string;
    }
}

const ObjectStyledP = styled.p({
    color: "#zzz",
});

const P = styled.p`
    color: black
    font-size: 11px;
`;

const Screen = styled.div`
    background: black;
    color: white;
    height: 100%;
`;

const ThemedP = styled(P)(
    ({ theme }) => `
        color: ${theme.color};
        line-height: calc(24px + 12px);
        font-size: 20pixels;
    `
);

const App: React.FC = () => (
    <ThemeProvider theme={{ color: "RebeccaPurple" }}>
        <Global
            styles={{
                "*": { margin: 0, padding: 0 },
                "body, html, #app": { height: "100%", width: "100%" },
            }}
        />
        <Screen>
            <ObjectStyledP>
                Text styled via Object Syntax that should be Red
            </ObjectStyledP>
            <P>Text that should be Black</P>
            <ThemedP>Text that is colored from the Theme</ThemedP>
        </Screen>
    </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
