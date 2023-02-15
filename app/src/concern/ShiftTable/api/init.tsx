const SPREAD_SHEET_ID = "1HYUUZHExbeG4qwOR_lTlGTZu5vtmWVnnXo4LDquNub8";
const API_KEY = "AIzaSyBhPDp6CmOdPMBQfDBabUWJ8U-YD6h4NzA";

export let isApiLoaded = false;

function getAllData(){
    const ranges = [
        "生徒リスト!A1:D1001",
    ];
    gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId : SPREAD_SHEET_ID,
        range : ranges,
    }).then((response :any) => {
        console.log(response);
    }).catch((err :any) => {
        console.log(err);
    });
}