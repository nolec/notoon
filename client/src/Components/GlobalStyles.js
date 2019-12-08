import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
 ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing:border-box;
    }
    html,
    body{
        height: 100%;
        font-family: 'Do Hyeon', sans-serif;
        font-size: 14px;
    }
`;

export default globalStyles;
