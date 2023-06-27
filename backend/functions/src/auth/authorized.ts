/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {Request, Response} from "express";

export function isAuthorized(opts: { hasRole: Array<"admin" | "locum" | "clinic" >, allowSameUser?: boolean }) {
  return (req: Request, res: Response, next: Function) => {
    const {role, uid} = res.locals;
    const {id} = req.params;

    if (opts.allowSameUser && id && uid === id) {
      return next();
    }

    if (!role) {
      return res.status(403).send();
    }

    if (opts.hasRole.includes(role)) {
      return next();
    }

    return res.status(403).send();
  };
}
