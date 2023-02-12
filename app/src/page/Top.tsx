import { css } from "solid-styled-components";
import Firebase from "../Firebase";

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
            </div>
            <div>
                <div id="g_id_onload"
                    data-client_id="568500639529-ascd05l9flrn233n4a50qadnh3s8ljmj.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="redirect"
                    data-login_uri="https://seiko-shift-tool.firebaseapp.com/__/auth/handler"
                    data-auto_prompt="false">
                </div>
                <div class="g_id_signin"
                    data-type="standard"
                    data-shape="rectangular"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
                </div>
            </div>
        </div>
    );
}

export default Top;