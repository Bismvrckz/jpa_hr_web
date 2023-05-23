const jwt = require("jsonwebtoken");
import { Json } from "sequelize/types/utils";
const { SECRET_WORD } = process.env;

function createToken(payload: string) {
  return jwt.sign(payload, SECRET_WORD);
}

function verifyToken(payload: string) {
  return jwt.verify(payload, SECRET_WORD);
}

export default { createToken, verifyToken };
