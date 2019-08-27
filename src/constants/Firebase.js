import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBSzCHtATNwEFVlphrnpGIt5iJkFq5ABOg",
  authDomain: "travelingapp-4639b.firebaseapp.com",
  databaseURL: "https://travelingapp-4639b.firebaseio.com",
  projectId: "travelingapp-4639b",
  storageBucket: "travelingapp-4639b.appspot.com",
  messagingSenderId: "914363783068",
  appId: "1:914363783068:web:78c42624f9e99155"
};

export const firebaseApp = firebase.initializeApp(config);

export const database = firebase.database();

// firebase.auth().onAuthStateChanged(function (user) {
//   console.log('user onAuthStateChanged:');
//   console.log(user);

//   if (user) {
//     // User is signed in.
//     localStorage.setItem('user', JSON.stringify(user));
//   } else {
//     // User is signed out.
//     localStorage.removeItem('user');
//   }
// });

