/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import {Request, Response} from "express";
import * as admin from "firebase-admin";
import {host} from "..";

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
    const {displayName, phoneNumber, role} = req.body;

    if (role) {
      await admin.auth().setCustomUserClaims(id, {role});
      const user = await admin.auth().getUser(id);
      return res.status(204).send({user: mapUser(user)});
    }

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
    const {id} = req.params;
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
      return res.status(200).send(`[
        {
          id: "1",
          start: DayPilot.Date.today().addDays(1).addHours(10),
          end: DayPilot.Date.today().addDays(1).addHours(16),
          text: "Belleville Clinic #3 \n Dr. Jake John \n 10:00 AM - 4:00 PM",
        },
        {
          id: "2",
          start: DayPilot.Date.today().addHours(12),
          end: DayPilot.Date.today().addHours(18),
          text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
        },
        {
          id: "2",
          start: DayPilot.Date.today().addHours(12),
          end: DayPilot.Date.today().addHours(18),
          text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
        },
        {
          id: "2",
          start: DayPilot.Date.today().addHours(12),
          end: DayPilot.Date.today().addHours(18),
          text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
        },
        {
          id: "2",
          start: DayPilot.Date.today().addHours(12),
          end: DayPilot.Date.today().addHours(18),
          text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
        },
        {
          id: "2",
          start: DayPilot.Date.today().addHours(12),
          end: DayPilot.Date.today().addHours(18),
          text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
        },
        {
          id: "2",
          start: DayPilot.Date.today().addHours(12),
          end: DayPilot.Date.today().addHours(18),
          text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
        }
      ];`);
    } catch (err) {
      return handleError(res, err);
    }
  } else {
    return res.status(401).send({message: "Unauthorized"});
  }
}
