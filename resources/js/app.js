require('./bootstrap');

console.log('test');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsvh6SY6Fn9GOVVOHQzcawZJHuiBbdBk8",
    authDomain: "push-test-d7c16.firebaseapp.com",
    projectId: "push-test-d7c16",
    storageBucket: "push-test-d7c16.appspot.com",
    messagingSenderId: "609543399031",
    appId: "1:609543399031:web:67dcd516bf2543f7ad0872"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            getToken(messaging, { vapidKey: 'BElUaHGWUVjOrA_jIlJ3koDGBv-SV1OGq6Qrc64ysGsfRhgrCw_iBZLUs6QTjSTgzfVEOrDAMtjsvtmciCqGuHg' })
                .then((currentToken) => {
                    if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        console.log(currentToken)
                        localStorage.setItem('notifications-allowed', 1)
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        alert('allow notifications')
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });
        } else {
            console.log('Rejected');
        }
    })
}

requestPermission()

