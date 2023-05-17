import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { Op } from "sequelize";
const { job_divisions } = require("../../../../models");
const handler = nextConnect();

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, postingStatus } = req.body;
    console.log({ id });

    await job_divisions.update(
      {
        postingStatus,
      },
      {
        where: {
          job_divisions_id: id,
        },
      }
    );

    const update = await job_divisions.findAll();
    //   {
    //   where: {
    //     postingStatus: {
    //       [Op.not]: "ARCHIVE",
    //     },
    //   },
    // }

    res.send({
      status: "Success",
      update,
    });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;
