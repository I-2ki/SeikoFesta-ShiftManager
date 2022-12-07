import { css } from "solid-styled-components";
import googleIcon from "../../assets/google.svg";

function LoginButton(props :any){
    const button = css`
      padding-left: 1vw;
      padding-right: 1vw;
      padding-top: 0.5vw;
      padding-bottom: 0.5vw;
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

    const labelText = css`
      color : black;
      font-size: max(1vw,15px);
    `;

    return (
      <div>
        <button class = {button} onClick = {props.loginMethod}>
          <div class = {contentContainer}>
            <img src = {googleIcon} alt = "Googleのアイコン"/>
            <p class = {labelText}>Googleでログイン</p>
          </div>
        </button>
      </div>
    );
}

export default LoginButton;