import { css } from "solid-styled-components";
import googleIcon from "../assets/google.svg";

function LoginButton(props :any){
    const button = css`
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        background: white;
        border-radius: 5px;
        border: none;
        box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.2);
        &:hover{
            cursor: pointer;
        }
    `;

    const contentContainer = css`
        display:flex;
        gap: 10px;   
    `;

    return (
      <div>
        <button class = {button} onClick = {props.loginMethod}>
          <div class = {contentContainer}>
            <img src = {googleIcon} alt = "Googleのアイコン"/>
            <p>Googleでログイン</p>
          </div>
        </button>
      </div>
    );
}

export default LoginButton;