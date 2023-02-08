import styled, { CreateStyled, CreateStyledComponent } from "@emotion/styled";
import { configureRules, checkStyles } from "./stylelint";

const getStyledComponent = (styled: CreateStyledComponent<any>) => (styles) => {
    let resolveComponentNamePromise: (name: string) => void = () => {};
    const componentNamePromise = new Promise(
        (resolve) => (resolveComponentNamePromise = resolve)
    );
    const styledComponent = styled(
        getStylesWithMirror(styles, componentNamePromise)
    );

    resolveComponentNamePromise(styledComponent.displayName ?? "");

    return styledComponent;
};

const getStyledWithMirror = () => {
    let styledWithMirror: CreateStyled = ((component, options) =>
        getStyledComponent(styled(component, options))) as CreateStyled;

    styledWithMirror = Object.entries(styled).reduce(
        (styledWithMirror, [key, styledForComponent]) => {
            styledWithMirror[key] = getStyledComponent(styledForComponent);

            return styledWithMirror;
        },
        styledWithMirror
    );

    return styledWithMirror;
};

const getStylesWithMirror = (styles, componentNamePromise) => {
    const checkStylesWithComponentNameContext = (styles) => {
        checkStyles(styles).then(async (errored) => {
            if (errored) {
                console.warn(`Found in a ${await componentNamePromise} component`);
            }
        });
    };

    if (typeof styles === "function") {
        return (props) => {
            const stylesToCheck = styles(props);

            checkStylesWithComponentNameContext(stylesToCheck);

            return stylesToCheck;
        };
    } else {
        checkStylesWithComponentNameContext(styles);

        return styles;
    }
};

const styledWithMirror: CreateStyled =
    process.env.NODE_ENV === "production" ? styled : getStyledWithMirror();

export { configureRules, styledWithMirror as styled };
export default styledWithMirror;
