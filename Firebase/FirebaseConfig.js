import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJfihHHfFfQv9VLmfMCF-zpPsSS_uIJAo",
    authDomain: "foodapp-805c5.firebaseapp.com",
    projectId: "foodapp-805c5",
    storageBucket: "foodapp-805c5.appspot.com",
    messagingSenderId: "512736613728",
    appId: "1:512736613728:web:53c77e065c4a2125647a05"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };