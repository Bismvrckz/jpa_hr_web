import uploadNewDivisionsImage from "@/library/multer/uploadNewDivisionsImage";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
const { job_divisions } = require("../../../../models");
const handler = nextConnect();

handler.use(uploadNewDivisionsImage);

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { namaBidangPekerjaan, detail, id, postingStatus } = req.query;

    await job_divisions.update(
      {
        job_division_name: namaBidangPekerjaan,
        postingStatus,
        detail,
      },
      {
        where: {
          job_divisions_id: id,
        },
      }
    );

    const dataUpdate = await job_divisions.findAll();

    res.send({
      status: "Success",
      dataUpdate,
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
