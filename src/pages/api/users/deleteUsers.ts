import type { NextApiRequest, NextApiResponse } from "next";
const { users } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.query;

    const resGetTable = await users.destroy({ where: { id: userId } });

    res.send({ status: "Success", resGetTable });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
}
