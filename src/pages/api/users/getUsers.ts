import type { NextApiRequest, NextApiResponse } from "next";
const { users } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const resGetTable = await users.findAll();

    res.send({ status: "Success", resGetTable });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
}
