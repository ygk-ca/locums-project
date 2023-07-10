// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://locumsfunc-default-rtdb.firebaseio.com",
  });


    const id = admin.auth().getUserByEmail('hsami@cityofkingston.ca').then(
      (userInfo) => {
        console.log(userInfo.uid);
        return userInfo.uid;
      }
    );
    //await admin.auth().deleteUser(id);
