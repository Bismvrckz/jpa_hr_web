import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { users } = require("../../../../models");

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resGetTable = await users.findAll();

    res.send({ status: "Success", resGetTable });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});


export default handler