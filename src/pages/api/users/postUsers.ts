import type { NextApiRequest, NextApiResponse } from "next";
const { users } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nameInput } = req.body;
    const resCreateData = await users.create({ name: nameInput });

    res.send({ status: "Success", resCreateData });
    console.log({ resCreateData });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
}
