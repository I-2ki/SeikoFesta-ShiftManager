import { css , keyframes} from "solid-styled-components";

function LoadingAnimation(){
    const motion = keyframes`
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
    
    const style = css`
        margin: auto;
        width: max(10vw,75px);
        height: max(10vw,75px);
        background-color: #4150BF;
        border-radius: 100%;
        animation: ${motion} .8s ease-in-out;
        animation-iteration-count: infinite;
    `;

    return <div class = {style}></div>;
}

export default LoadingAnimation;