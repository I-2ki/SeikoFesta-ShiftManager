import { createScriptLoader } from "@solid-primitives/script-loader";
import { isGisLoaded } from "../../Auth/auth";

const SPREAD_SHEET_ID = "1HYUUZHExbeG4qwOR_lTlGTZu5vtmWVnnXo4LDquNub8";
const API_KEY = "AIzaSyBhPDp6CmOdPMBQfDBabUWJ8U-YD6h4NzA";
const DISCOVERY_DOCS = "https://sheets.googleapis.com/$discovery/rest?version=v4";

export let isGapiLoaded = false;

createScriptLoader({
    src:"https://apis.google.com/js/api.js",
    async : true,
    defer : true,
    async onLoad(){
        gapi.load("client",initGapiClient);
        isGapiLoaded = true;
    }
});

async function initGapiClient(){
    await gapi.client.init({
        apiKey : API_KEY,
        discoveryDocs : DISCOVERY_DOCS,
    });
}

export function fetchAllData(){
    console.log("OK");
    const ranges = [
        "生徒リスト!A1:D1001",
        "一日目!A1:AU1000",
    ];
    gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId : SPREAD_SHEET_ID,
        range : ranges,
    }).then((response :any) => {
        console.log(response);
    });
}

export function onLoadEnd(callback :any){
    if(isGapiLoaded && isGisLoaded){
        callback();
        return;
    }
    setTimeout(() => {
        onLoadEnd(callback);
    },500)
}