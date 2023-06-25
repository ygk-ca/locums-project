import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import {routesConfig} from "./users/routes-config";

admin.initializeApp();

const app = express();
app.use(cors({origin: "http://localhost:4200"}));
app.use(bodyParser.json());
routesConfig(app);

export const api = functions.https.onRequest(app);
