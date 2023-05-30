import type { NextApiRequest, NextApiResponse } from "next";
const { jobLists } = require("../../../../models");
import nextConnect from "next-connect";
const handler = nextConnect();

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.send({ status: "Success" });
  } catch (error) {
    console.log({ error });
    res.status(400).send({ error });
  }
});
