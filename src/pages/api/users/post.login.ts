import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { compare } from "../../../library/bcrypt";
import jwt from "../../../library/jwt";
const { users } = require("../../../../models");

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, password } = req.body;
    const resGetTable = await users.findOne({ where: { username } });
    const { dataValues } = resGetTable;

    const passwordMatch = await compare(password, dataValues.password);

    if (!passwordMatch) {
      throw new Error("Not Authorized, password does not match.");
    }

    const token = jwt.createToken(dataValues);

    res.send({
      status: "Success",
      username: dataValues.username,
      role: dataValues.role,
      id: dataValues.id,
      token,
    });
  } catch (error: any) {
    console.log({ error });
    res.status(403).send({ status: "Unauthorized", message: error.message });
  }
});

export default handler;
