import { createScriptLoader } from "@solid-primitives/script-loader";
import { createSignal } from "solid-js";

const CLIENT_ID = '568500639529-ascd05l9flrn233n4a50qadnh3s8ljmj.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

let client :google.accounts.oauth2.TokenClient;
let accessToken :string;

export let isGisLoaded = false;
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
        isGisLoaded = true;
    }
});

function initClient(){
    client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse :google.accounts.oauth2.TokenResponse) => {
            if(tokenResponse.error !== undefined){
                throw new Error(tokenResponse.error);
            }
            accessToken = tokenResponse.access_token;
            localStorage.setItem("tokenResponse",JSON.stringify(tokenResponse));
            setLoginState(true);
        },
    });
}

function getToken(){
    client.requestAccessToken();
}

function revokeToken(){
    google.accounts.oauth2.revoke(accessToken,() => {
        console.log("success revoke token");
    });
}

export function signIn(){
    getToken();
}

export function signOut(){
    revokeToken();
    localStorage.removeItem("tokenResponse");
    setLoginState(false);
}

function isLogined():boolean{
    const tokenResponseCache = getTokenResponseCache();
    if(!tokenResponseCache) return false;
    return google.accounts.oauth2.hasGrantedAllScopes(tokenResponseCache,SCOPES);
}

function getTokenResponseCache() :null | google.accounts.oauth2.TokenResponse{
    const tokenResponseCache = localStorage.getItem("tokenResponse");
    if(!tokenResponseCache) return null;
    return JSON.parse(tokenResponseCache);
}