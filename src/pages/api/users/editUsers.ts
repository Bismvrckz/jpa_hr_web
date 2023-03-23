import type { NextApiRequest, NextApiResponse } from "next";
const { users } = require("../../../../models");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, userName } = req.body;
    console.log({ userId, userName });

    const resGetTable = await users.update(
      { where: { id: userId } },
      { name: userName }
    );

    console.log({ resGetTable });

    res.send({ status: "Success", resGetTable });
  } catch (error) {
    console.log({ error });
    res.send({ error });
  }
}
