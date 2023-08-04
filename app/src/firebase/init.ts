import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyBi7mIihd_MmBn-l63RnjYtjDlOjdLmeBQ",
    authDomain: "seiko-shift-tool.firebaseapp.com",
    databaseURL: "https://seiko-shift-tool-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "seiko-shift-tool",
    storageBucket: "seiko-shift-tool.appspot.com",
    messagingSenderId: "568500639529",
    appId: "1:568500639529:web:421467d993063107c14938",
    measurementId: "G-XYH9KL989Q"
}

export const app = initializeApp(firebaseConfig);