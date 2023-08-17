/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import {routesConfig} from "./users/routes-config";
const serviceAccount = require("./key/serviceAccountKey.json");
export const host = "http://localhost:4200";
// export const host = "https://ygk-ca.github.io";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://locumsfunc-default-rtdb.firebaseio.com",
});
export const db = admin.firestore();
const app = express();
app.use(cors({origin: host}));
app.use(bodyParser.json());
routesConfig(app);

export const api = functions.https.onRequest(app);
