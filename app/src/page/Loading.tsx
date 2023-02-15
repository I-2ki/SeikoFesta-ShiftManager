import { css } from "solid-styled-components";
import LoadingAnimation from "../ui/LoadingAnimation/LoadingAnimation";

function Loading(){
    const container = css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    `;

    const text = css`
        font-family: 'Noto Sans JP' , sans-serif;
        font-weight: 300;
        font-size: 6vh;
    `;

    return (
        <div class = {container}>
            <LoadingAnimation/>
            <p class = {text}>NowLoading</p>
        </div>
    );
}

export default Loading;