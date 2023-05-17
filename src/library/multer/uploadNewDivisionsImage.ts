import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      cb(null, path.join(process.cwd(), "public", "jobDivisionsImage"));
    },

    filename: function (req: any, file: any, cb: any) {
      cb(null, `${req.query.id}.jpg`);
    },
  }),
  limits: {
    fileSize: 1048576,
  },
});

const uploadNewDivisionsImage = upload.single("divisionImage");

export default uploadNewDivisionsImage;
