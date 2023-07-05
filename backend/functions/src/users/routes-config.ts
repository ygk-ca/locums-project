/* eslint-disable require-jsdoc */
import {Application} from "express";
import {create, all, get, patch, remove, calendar} from "./controller";
import {isAuthenticated} from "../auth/authenticated";
import {isAuthorized} from "../auth/authorized";

export function routesConfig(app: Application) {
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
  app.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({hasRole: ["admin"]}),
    remove,
  ]);

  app.get("/calendar", [
    calendar,
  ]);
}
