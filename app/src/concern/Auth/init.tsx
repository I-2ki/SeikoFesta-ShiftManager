import { createScriptLoader } from "@solid-primitives/script-loader";
import { createSignal } from "solid-js";

const CLIENT_ID = '568500639529-ascd05l9flrn233n4a50qadnh3s8ljmj.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

let client :any;

export let accessToken :string;
export const [loginState,setLoginState] = createSignal<null | boolean>(null);

createScriptLoader({
    src:"https://accounts.google.com/gsi/client",
    async : true,
    defer : true,
    async onLoad(){
        initClient();
        if(isLogined()){
            setLoginState(true);
        }else{
            setLoginState(false);
        }
    }
});

function initClient(){
    client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (_tokenResponse :any) => {
            accessToken = _tokenResponse.access_token;
            localStorage.setItem("tokenResponse",JSON.stringify(_tokenResponse));
            setLoginState(true);
        },
    });
}

export function getToken(){
    client.requestAccessToken();
}

export function revokeToken(){
    google.account.oauth2.revoke(accessToken);
}

function isLogined():boolean{
    const tokenResponseCache = getTokenResponseCache();
    if(!tokenResponseCache) return false;
    return google.accounts.oauth2.hasGrantedAllScopes(tokenResponseCache,SCOPES);
}

function getTokenResponseCache(){
    const tokenResponseCache = localStorage.getItem("tokenResponse");
    if(!tokenResponseCache) return null;
    return JSON.parse(tokenResponseCache);
}