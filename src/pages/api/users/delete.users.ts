import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { users } = require("../../../../models");

const handler = nextConnect();

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;

    const resGetTable = await users.destroy({ where: { id: userId } });

    res.send({ status: "Success", resGetTable });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;
