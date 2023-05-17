import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { hash } from "../../../library/bcrypt";
const { users } = require("../../../../models");

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, password } = req.body;
    const passwordHash = hash(password);

    console.log({ passwordHash });

    const resCreateUsers = await users.create({
      username,
      password: passwordHash,
    });

    res.send({ status: "Success", resCreateUsers, passwordHash });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;
