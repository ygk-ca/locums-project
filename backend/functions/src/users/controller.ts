/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import {Request, Response} from "express";
import * as admin from "firebase-admin";
import {db, host} from "..";

export async function create(req: Request, res: Response) {
  const allowedOrigin = host; // Specify the allowed URL
  const requestOrigin = req.headers.origin;

  if (requestOrigin === allowedOrigin) {
    try {
      const {displayName, phoneNumber, password, email, role} = req.body;

      if (!displayName || !password || !email || !role) {
        return res.status(400).send({message: "Missing fields"});
      }

      const {uid} = await admin.auth().createUser({
        displayName: displayName,
        password: password,
        email: email,
        phoneNumber: phoneNumber});
      await admin.auth().setCustomUserClaims(uid, {"role": role});
      return res.status(201).send({uid});
    } catch (err) {
      return handleError(res, err);
    }
  } else {
    return res.status(401).send({message: "Unauthorized"});
  }
}

export async function all(req: Request, res: Response) {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);
    return res.status(200).send({users});
  } catch (err) {
    return handleError(res, err);
  }
}

function mapUser(user: admin.auth.UserRecord) {
  const customClaims = (user.customClaims || {role: ""}) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";
  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    role,
    phoneNumber: user.phoneNumber || "",
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
}

export async function get(req: Request, res: Response) {
  try {
    const {id} = req.params;
    const user = await admin.auth().getUser(id);
    return res.status(200).send({user: mapUser(user)});
  } catch (err) {
    return handleError(res, err);
  }
}

export async function patch(req: Request, res: Response) {
  try {
    const {id} = req.params;
    const {displayName, phoneNumber} = req.body;

    if (!id || !displayName || !phoneNumber) {
      return res.status(400).send({message: "Missing fields"});
    }

    await admin.auth().updateUser(id, {displayName, phoneNumber});
    const user = await admin.auth().getUser(id);

    return res.status(204).send({user: mapUser(user)});
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = await admin.auth().getUserByEmail(req.body).then(
      (userInfo) => {
        return userInfo.uid;
      }
    );

    await admin.auth().deleteUser(id);
    return res.status(204).send({});
  } catch (err) {
    return handleError(res, err);
  }
}

function handleError(res: Response, err: any) {
  return res.status(500).send({message: `${err.code} - ${err.message}`});
}

export async function calendar(req: Request, res: Response) {
  const allowedOrigin = host; // Specify the allowed URL
  const requestOrigin = req.headers.origin;

  if (requestOrigin === allowedOrigin) {
    try {
      return res.status(200).send({
        "Calendar": "John",
      });
    } catch (err) {
      return handleError(res, err);
    }
  } else {
    return res.status(401).send({message: "Unauthorized"});
  }
}

export async function getuser(req: Request, res: Response) {
  try {
    let {id} = req.params;
    id = await admin.auth().getUserByEmail(id).then(
      (userInfo) => {
        return userInfo.uid;
      }
    );
    const user = await admin.auth().getUser(id);
    return res.status(200).send(mapUser(user));
  } catch (err) {
    return handleError(res, err);
  }
}

export async function edituser(req: Request, res: Response) {
  try {
    let {id} = req.params;
    const role = req.body;
    const email = id;
    id = await admin.auth().getUserByEmail(id).then(
      (userInfo) => {
        return userInfo.uid;
      }
    );
    await admin.auth().setCustomUserClaims(id, {"role": role});
    if (role == "clinic") {
      db.collection("clinics").doc(email).set({shifts: {}})
        .then(() => {
          // success
        })
        .catch((error: any) => {
          return res.status(500).send({message: `${error.code} - ${error.message}`});
        });
    }
    const user = await admin.auth().getUser(id);
    return res.status(200).send(mapUser(user));
  } catch (err) {
    return handleError(res, err);
  }
}

export async function addshift(req: Request, res: Response) {
  try {
    let {id} = req.params;
    const shift = req.body;
    const email = id;
    id = await admin.auth().getUserByEmail(id).then(
      (userInfo) => {
        return userInfo.uid;
      }
    );
    const docRef = db.collection("clinics").doc(email);
    return db.runTransaction((t) => {
      return t.get(docRef).then((doc) => {
        const obj = doc.get("shifts") ? doc.get("shifts") : {};
        obj[shift.start+shift.end] = shift;

        t.set(docRef, {shifts: obj}, {
          merge: true,
        });
        return;
      }).then(() => {
        return res.status(200).send({message: "Shift Added"});
      }).catch((error) => {
        return handleError(res, error);
      });
    });
  } catch (err) {
    return handleError(res, err);
  }
}
