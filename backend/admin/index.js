// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const serviceAccount = require("./serviceAccountKey.json");
const { userInfo } = require("os");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://locumsfunc-default-rtdb.firebaseio.com",
  });


  admin.auth().createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+16473082145',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  })
  .then((userRecord) => {
    console.log(userRecord);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });

