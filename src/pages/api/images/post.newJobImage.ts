import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import uploadNewJobImage from "@/library/multer/uploadNewJobImage";
const { jobLists } = require("../../../../models");
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

handler.post(
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

      await jobLists.create({
        level,
        job_name: job_name.trim(),
        imageDir: `/jobImages/${job_list_id}.jpg`,
        sort_desc,
        full_desc,
        job_list_id: parseInt(job_list_id),
        min_salary: parseInt(min_salary),
        max_salary: parseInt(max_salary),
        postingStatus,
        batasPengiriman: new Date(batasPengiriman),
        job_divisions_id: parseInt(job_divisions_id),
      });

      const update = await jobLists.findAll();

      res.send({
        status: "Success",
        update,
      });
    } catch (error) {
      res.status(400).send({ status: "error", error });
    }
  }
);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
