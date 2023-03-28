import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "../../../../components/bcrypt";
import jwt from "../../../../components/jwt";
const { users } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      id: dataValues.id,
      token,
    });
  } catch (error: any) {
    console.log({ error });
    res.status(403).send({ status: "Unauthorized", message: error.message });
  }
}
