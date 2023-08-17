// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://locumsfunc-default-rtdb.firebaseio.com",
  });

const db = admin.firestore();

db.collection("Clinic1").doc('shifts').set({})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});
