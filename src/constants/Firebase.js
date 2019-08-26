import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyBSzCHtATNwEFVlphrnpGIt5iJkFq5ABOg",
  authDomain: "travelingapp-4639b.firebaseapp.com",
  databaseURL: "https://travelingapp-4639b.firebaseio.com",
  projectId: "travelingapp-4639b",
  storageBucket: "travelingapp-4639b.appspot.com",
  messagingSenderId: "914363783068",
  appId: "1:914363783068:web:78c42624f9e99155"
};

export const firebaseApp = firebase.initializeApp(config);
// firebase.initializeApp(config);

// export default firebase;
export const database = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
  console.log('user:');
  console.log(user)
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

