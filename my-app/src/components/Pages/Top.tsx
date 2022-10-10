import { css } from "solid-styled-components";
import { getAuth , GoogleAuthProvider , signInWithRedirect} from "firebase/auth";
import LoginButton from "../Molecules/LoginButton";


function Top(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const container = css`
        position: relative;
        left: 100px;
    `;
  
    const titleText = css`
        font-size: 8vh;
        font-weight: 300;
    `;

    return (
      <div class = {container}>
        <h1 class = {titleText}>
            聖光祭<br/>
            統一シフト<br/>
            ログイン
        </h1>
        <p>
            統一シフトの使用にはログインが必要です。<br/>
            ※聖光学院のメールアドレス限定
        </p>
        <LoginButton loginMethod = {() => signInWithRedirect(auth,provider)}/>
      </div>
    );
}

export default Top;