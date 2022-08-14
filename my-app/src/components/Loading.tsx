import { css , keyframes } from "solid-styled-components";

function Loading(){
    const container = css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    `;

    const beatCircle = keyframes`
        0% { 
            scale: 100%;
        }
        50% { 
            scale: 50%;
        }
        100% { 
            scale: 100%;
        }
    `;

    const animation = css`
        margin: auto;
        width: max(10vw,75px);
        height: max(10vw,75px);
        background-color: #4150BF;
        border-radius: 100%;
        animation: ${beatCircle} .8s ease-in-out;
        animation-iteration-count: infinite;
    `;

    const text = css`
        font-family: 'Noto Sans JP' , sans-serif;
        font-weight: 300;
        font-size: 6vh;
    `;

    return (
        <div class = {container}>
            <div class = {animation}></div>
            <p class = {text}>NowLoading</p>
        </div>
    );
}

export default Loading;