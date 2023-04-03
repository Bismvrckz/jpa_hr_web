const bcryptInstance = require("bcrypt");

export function hash(payload: string) {
  return bcryptInstance.hashSync(payload, 10);
}

export function compare(payload: string, hash: string) {
  return bcryptInstance.compare(payload, hash);
}
