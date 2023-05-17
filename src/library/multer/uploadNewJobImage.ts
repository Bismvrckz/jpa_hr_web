import multer from "multer";
import path from "path";

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            cb(null, path.join(process.cwd(), "public", "jobImages"));
        },

        filename: function (req: any, file: any, cb: any) {
            cb(null, `${req.query.job_list_id}.jpg`);
        },
    }),
    limits: {
        fileSize: 1048576,
    },
});

const uploadNewJobImage = upload.single("jobImage");

export default uploadNewJobImage;
