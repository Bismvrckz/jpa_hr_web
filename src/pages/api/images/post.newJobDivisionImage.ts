import uploadNewDivisionsImage from "@/library/multer/uploadNewDivisionsImage";
import type { NextApiRequest, NextApiResponse } from "next";
const { job_divisions } = require("../../../../models");
import nextConnect from "next-connect";
import { Op } from "sequelize";
const handler = nextConnect();

handler.use(uploadNewDivisionsImage);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      namaBidangPekerjaan,
      // summary,
      detail,
      id,
      postingStatus,
    } = req.query;

    await job_divisions.create({
      job_division_name: namaBidangPekerjaan,
      job_divisions_id: id,
      postingStatus,
      // summary,
      detail,
      imageDir: `/jobDivisionsImage/${id}.jpg`,
    });

    const newJobDivisionsUpdate = await job_divisions.findAll();
    //   {
    //   where: {
    //     postingStatus: {
    //       [Op.not]: "ARCHIVE",
    //     },
    //   },
    // }

    res.send({
      status: "Success",
      newJobDivisionsUpdate,
    });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
