import type { NextApiRequest, NextApiResponse } from "next";
const { users } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, userName } = req.body;
    console.log({ userId, userName });

    const resFindTable = await users.findOne({ where: { id: userId } });

    await resFindTable.update({ name: userName });

    const fullTable = await users.findAll();

    res.send({ status: "Success", fullTable });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
}
