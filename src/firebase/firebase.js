import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId:  process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID ,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

let app;

if(firebase.apps.length===0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

export const storage = getStorage(app,'gs://friendsadda-clone.appspot.com')