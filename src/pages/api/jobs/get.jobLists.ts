import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { jobLists } = require("../../../../models");

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (id == "all") {
      const resGetJobLists = await jobLists.findAll();

      return res.send({ status: "Success", resGetJobLists });
    }

    const resGetJobLists = await jobLists.findOne({
      where: { id },
    });

    res.send({ status: "Success", resGetJobLists });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;
