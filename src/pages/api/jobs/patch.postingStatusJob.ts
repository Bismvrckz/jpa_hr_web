import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { jobLists } = require("../../../../models");
const handler = nextConnect();

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { job_list_id, postingStatus } = req.body;

    await jobLists.update(
      {
        postingStatus,
      },
      {
        where: {
          job_list_id,
        },
      }
    );

    const update = await jobLists.findAll();

    res.send({
      status: "Success",
      update,
    });
  } catch (error) {
    res.send({ error });
  }
});

export default handler;
