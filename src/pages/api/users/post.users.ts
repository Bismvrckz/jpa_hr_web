import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { users } = require("../../../../models");

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { nameInput } = req.body;
    const resCreateData = await users.create({ name: nameInput });

    res.send({ status: "Success", resCreateData });
    console.log({ resCreateData });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;
