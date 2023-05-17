import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { users } = require("../../../../models");

const handler = nextConnect();

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
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
});

export default handler;
