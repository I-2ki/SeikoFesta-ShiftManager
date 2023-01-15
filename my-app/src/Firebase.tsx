import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

class Firebase{
    private static _db :Firestore;
    private static _auth :Auth;
    private static _app :FirebaseApp;
    private constructor(){
    }
    static getApp() :FirebaseApp{
        if(Firebase._app){
            return Firebase._app;
        }
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
        const app = initializeApp(firebaseConfig);
        return app;
    }
    static get db() :Firestore{
        if(!this._db){
            this._db = getFirestore(Firebase.getApp());
        }
        return this._db;
    }
    static get auth() :Auth{
        if(!this._auth){
            this._auth = getAuth(Firebase.getApp());
        }
        return this._auth;
    }
}

export default Firebase;