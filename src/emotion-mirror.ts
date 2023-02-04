import styled, { CreateStyled } from "@emotion/styled";
import { configureRules, checkStyles } from "./stylelint";

const getStyledWithMirror = () => {
    let styledWithMirror = ((component, options) => (styles) =>
        styled(
            component,
            options
        )(getStylesWithMirror(styles))) as CreateStyled;

    styledWithMirror = Object.entries(styled).reduce(
        (styledWithMirror, [key, styledForComponent]) => {
            styledWithMirror[key] = (styles) =>
                styledForComponent(getStylesWithMirror(styles));

            return styledWithMirror;
        },
        styledWithMirror
    );

    return styledWithMirror;
};

const getStylesWithMirror = (styles) => {
    if (typeof styles === "function") {
        return (props) => {
            const stylesToCheck = styles(props);

            checkStyles(stylesToCheck);

            return stylesToCheck;
        };
    } else {
        checkStyles(styles);

        return styles;
    }
};

const styledWithMirror: CreateStyled =
    process.env.NODE_ENV === "production" ? styled : getStyledWithMirror();

export { configureRules, styledWithMirror as styled };
export default styledWithMirror;
