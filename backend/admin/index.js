// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://locumsfunc-default-rtdb.firebaseio.com",
  });

const db = admin.firestore();


const email = "hsami@cityofkingston.ca";
const shift = "2023-08-282023-08-31";

const docRef = db.collection("clinics").doc(email);
    return db.runTransaction((t) => {
      return t.get(docRef).then((doc) => {
        const obj = doc.get("shifts");
        delete obj[shift];

        console.log(obj)

        t.set(docRef, {shifts: obj}, {
          merge: false,
        });
        return;
      }).then(() => {
        console.log('done');
      }).catch((error) => {
        console.log(error);
      });
    });