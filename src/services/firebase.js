import firebase from 'firebase';

const config = {
      apiKey: "AIzaSyCtKOUnzu4HecDcRmuhybgYsBMHL_KBOyE",
      authDomain: "cyphchat.firebaseapp.com",
      databaseURL: "https://cyphchat.firebaseio.com",
      projectId: "cyphchat",
      storageBucket: "cyphchat.appspot.com",
      messagingSenderId: "375015518144",
      appId: "1:375015518144:web:670e8d0cf8861542ca2225",
      measurementId: "G-8K3LD12Q8B"
};

firebase.initializeApp(config);
firebase.analytics();

export const auth = firebase.auth;
export const db = firebase.database();


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.4/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyCtKOUnzu4HecDcRmuhybgYsBMHL_KBOyE",
//     authDomain: "cyphchat.firebaseapp.com",
//     databaseURL: "https://cyphchat.firebaseio.com",
//     projectId: "cyphchat",
//     storageBucket: "cyphchat.appspot.com",
//     messagingSenderId: "375015518144",
//     appId: "1:375015518144:web:670e8d0cf8861542ca2225",
//     measurementId: "G-8K3LD12Q8B"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>