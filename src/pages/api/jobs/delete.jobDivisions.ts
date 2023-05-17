import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { job_divisions } = require("../../../../models");

const handler = nextConnect();

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    await job_divisions.destroy({ where: { job_divisions_id: id } });

    const jobDivisionsUpdate = await job_divisions.findAll();

    res.send({
      status: "Success",
      jobDivisionsUpdate,
    });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;
