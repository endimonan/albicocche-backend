import crypto from "crypto";

export const generateVerificationCode = (length = 6): string => {
  const code = crypto
    .randomInt(Math.pow(10, length - 1), Math.pow(10, length))
    .toString();
  return code;
};
