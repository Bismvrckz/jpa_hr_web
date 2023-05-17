import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { Op } from "sequelize";
const { job_divisions } = require("../../../../models");

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { job_divisions_id } = req.query;

    if (job_divisions_id == "all") {
      const resGetJobDivisions = await job_divisions.findAll();
      //   {
      //   where: {
      //     postingStatus: {
      //       [Op.not]: "ARCHIVE",
      //     },
      //   },
      // }

      return res.send({ status: "Success", resGetJobDivisions });
    }

    const resGetJobDivisions = await job_divisions.findOne({
      where: { job_divisions_id },
    });

    res.send({ status: "Success", resGetJobDivisions });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;
