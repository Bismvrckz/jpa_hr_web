import type { NextApiRequest, NextApiResponse } from "next";
const { job_divisions } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { job_divisions_id } = req.query;

    if (job_divisions_id == "all") {
      const resGetJobDivisions = await job_divisions.findAll();

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
}
