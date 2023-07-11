/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {Application} from "express";
import {create, all, get, patch, remove, calendar, getuser, edituser} from "./controller";
import {isAuthenticated} from "../auth/authenticated";
import {isAuthorized} from "../auth/authorized";

export function routesConfig(app: Application) {
  // register a user [cors handled in function]
  app.post("/users",
    create
  );
  // lists all users
  app.get("/users", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin"]}),
    all,
  ]);
  // get :id user
  app.get("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin"], allowSameUser: true}),
    get,
  ]);
  // updates :id user
  app.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin"], allowSameUser: true}),
    patch,
  ]);
  // deletes :id user
  app.delete("/users", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin"]}),
    remove,
  ]);
  // get user data by Email
  app.get("/users/getByEmail/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin"]}),
    getuser,
  ]
  );
  // get calendar json
  app.get("/calendar", [
    calendar,
  ]);
  // edit user role
  app.patch("/users/getByEmail/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin"]}),
    edituser,
  ]);
}
