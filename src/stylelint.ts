import { css } from "@emotion/react";
import { stylelint } from "./vendor/stylelint-bundle.min.js";

let configuredRules = {
    "annotation-no-unknown": true,
    "at-rule-no-unknown": true,
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "comment-no-empty": true,
    "declaration-block-no-duplicate-custom-properties": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "font-family-no-duplicate-names": true,
    "function-calc-no-unspaced-operator": true,
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-no-unknown": true,
    "keyframe-block-no-duplicate-selectors": true,
    "keyframe-declaration-no-important": true,
    "media-feature-name-no-unknown": true,
    "named-grid-areas-no-invalid": true,
    "no-duplicate-selectors": true,
    "no-invalid-double-slash-comments": true,
    "no-irregular-whitespace": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "string-no-newline": true,
    "unit-no-unknown": true,
};

const checkStyles = (styles) => {
    const { styles: parsedStyles } = css(styles);

    return stylelint
        .lint({
            code: `
                * {
                    ${parsedStyles}
                }
            `,
            config: {
                rules: configuredRules,
            },
            ...defaultLintOptions,
        })
        .then(({ errored, results }) => {
            if (errored) {
                console.warn("The following CSS has issue(s):");
                console.warn(parsedStyles);
                results.forEach(({ warnings = [] }) => {
                    warnings.forEach(({ text }) => {
                        console.warn(text);
                    });
                });
            }

            return Boolean(errored);
        })
        .catch((error) => {
            console.error(error);
        });
};

const configureRules = (rules: { [key: string]: any }) => {
    configuredRules = {
        ...configuredRules,
        ...rules,
    };
};

const defaultLintOptions = {
    cacheLocation: undefined,
    cacheStrategy: undefined,
    codeFilename: undefined,
    configBasedir: undefined,
    configFile: undefined,
    customSyntax: undefined,
    disableDefaultIgnores: undefined,
    files: undefined,
    fix: undefined,
    formatter: undefined,
    globbyOptions: undefined,
    ignoreDisables: undefined,
    ignorePath: undefined,
    ignorePattern: undefined,
    maxWarnings: undefined,
    quiet: undefined,
    reportDescriptionlessDisables: undefined,
    reportNeedlessDisables: undefined,
    reportInvalidScopeDisables: undefined,
    syntax: undefined,
};

export { checkStyles, configureRules };
