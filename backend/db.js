const admin = require('firebase-admin');
const serviceAccount = require('./key/serviceAccountKey.json');
const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = db;