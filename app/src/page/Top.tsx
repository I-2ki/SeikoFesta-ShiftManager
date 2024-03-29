import { css } from "solid-styled-components";
import Auth from "../firebase/auth";

function Top(){
    const titleText = css`
        font-size: max(4vw,30px);
        font-weight: 300;
    `;

    const loginArea = css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        text-align: center;
        background-color: #4150BF;
        width : max(30vw,250px);
        height: max(20vw,250px);
        border-radius : 10px;
    `;

    const subTitleText = css`
        font-size : max(3vw,40px);
        font-weight: 300;
        color : white;
    `;

    const text = css`
        font-size : max(1vw,15px);
        font-weight: 300;
        color : white;
    `;


    return (
        <div>
            <h1 class = {titleText}>
                聖光祭　統一シフト
            </h1>
            <div class = {loginArea}>
                <h2 class = {subTitleText}>ログイン</h2>
                <p class = {text}>※聖光学院のアカウントのみ</p>
                <button onClick={Auth.logIn}>ログイン</button>
            </div>
        </div>
    );
}

export default Top;