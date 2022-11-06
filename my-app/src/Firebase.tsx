import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

class Firebase{
    private static _instance :Firebase;
    private static _db :Firestore;
    private static _auth :Auth;
    
    static init(){
        const firebaseConfig = {
            apiKey: "AIzaSyBi7mIihd_MmBn-l63RnjYtjDlOjdLmeBQ",
            authDomain: "seiko-shift-tool.firebaseapp.com",
            projectId: "seiko-shift-tool",
            storageBucket: "seiko-shift-tool.appspot.com",
            messagingSenderId: "568500639529",
            appId: "1:568500639529:web:421467d993063107c14938",
            measurementId: "G-XYH9KL989Q",
            databaseURL:"https://seiko-shift-tool-default-rtdb.asia-southeast1.firebasedatabase.app",
        };
        initializeApp(firebaseConfig);
    }

    static get instance() :Firebase{
        if(!this._instance){
            this._instance = new Firebase();
        }
        return this._instance;
    }

    static get db() :Firestore{
        if(!this._db){
            this._db = getFirestore();
        }
        return this._db;
    }

    static get auth() :Auth{
        if(!this._auth){
            this._auth = getAuth();
        }
        return this._auth;
    }
}

export default Firebase;