import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "../../../../components/bcrypt";
const { users } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
