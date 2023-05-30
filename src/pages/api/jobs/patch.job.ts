import uploadNewJobImage from "@/library/multer/uploadNewJobImage";
import type { NextApiRequest, NextApiResponse } from "next";
const { jobLists } = require("../../../../models");
import nextConnect from "next-connect";
const handler = nextConnect();

handler.use(uploadNewJobImage);

interface JobQueryParams {
  level: string;
  job_name: string;
  sort_desc: string;
  full_desc: string;
  min_salary: string;
  max_salary: string;
  job_list_id: string;
  postingStatus: string;
  batasPengiriman: string;
  job_divisions_id: string;
}

handler.patch(
  async (
    req: NextApiRequest & { query: JobQueryParams },
    res: NextApiResponse
  ) => {
    try {
      const {
        level,
        job_name,
        sort_desc,
        full_desc,
        min_salary,
        max_salary,
        job_list_id,
        postingStatus,
        batasPengiriman,
        job_divisions_id,
      }: JobQueryParams = req.query;

      jobLists.update(
        {
          level,
          sort_desc,
          full_desc,
          postingStatus,
          job_name: job_name.trim(),
          min_salary: parseInt(min_salary),
          max_salary: parseInt(max_salary),
          job_list_id: parseInt(job_list_id),
          imageDir: `/jobImages/${job_list_id}.jpg`,
          batasPengiriman: new Date(batasPengiriman),
          job_divisions_id: parseInt(job_divisions_id),
        },
        {
          where: { job_list_id },
        }
      );

      const update = await jobLists.findAll();

      res.send({
        status: "Success",
        update,
      });
    } catch (error) {
      console.log({ error });
      res.status(400).send({ error });
    }
  }
);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
