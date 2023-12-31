import jwt, { sign, verify } from "jsonwebtoken";
import { Unauthorized } from "./appErrors";
import {
  getAccessTokenSecret,
  getAccessTokenTtl,
  getPasswordResetSecret,
  getPasswordResetTokenTtl,
  getRefreshTokenSecret,
  getRefreshTokenTtl,
  getVerificationSecret,
  getVerificationTokenTtl,
} from "./appConfig";

// secret
const verificationSecret = getVerificationSecret();
const accessTokenSecret = getAccessTokenSecret();
const refershTokenSecret = getRefreshTokenSecret();
const passwordResetSecret = getPasswordResetSecret();
// ttl
const accessTokenTtl = getAccessTokenTtl();
const refreshTokenTtl = getRefreshTokenTtl();
const verificationTokenTtl = getVerificationTokenTtl();
const passwordResetTtl = getPasswordResetTokenTtl();

export const generateVerificationToken = (email: string) => {
  const payload = { email: email };
  const secret = verificationSecret as string;
  // const options = { expiresIn: verificationTokenTtl as string };
  const token = sign(payload, secret);
  return token;
};

export const generateAccessToken = (email: string, id: string, role: any) => {
  const payload = { email: email, id: id, role: role };
  const secret = accessTokenSecret as string;
  // const options = { expiresIn: accessTokenTtl as string };
  const token = sign(payload, secret);
  return token;
};

export const generateRefreshToken = (email: string, id: string, role: any) => {
  const payload = { email: email, id: id, role: role };
  const secret = refershTokenSecret as string;
  // const options = { expiresIn: refreshTokenTtl as string };
  const token = sign(payload, secret);
  return token;
};

export const getTokenFromTokenHeader = (tokenHeader: string) => {
  return tokenHeader.split(" ")[1];
};

export const decodeRefreshToken = (refreshToken: string) => {
  return verify(refreshToken, refershTokenSecret as string);
};

export const decodeVerificationToken = (verificationToken: string) => {
  return verify(verificationToken, verificationSecret as string);
};

export const verifyAccessToken = (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, accessTokenSecret as string);
    return decoded;
  } catch (error) {
    throw new Unauthorized("Invalid access token");
  }
};

export const generatePasswordResetToken = (
  email: string,
  oldPassword: string
) => {
  const payload = { email: email };
  const secret = ((passwordResetSecret as string) + oldPassword) as string;
  // const options = { expiresIn: passwordResetTtl as string };
  const token = sign(payload, secret);
  return token;
};

export const decodePasswordResetToken = (
  passwordResetToken: string,
  currentPassword: string
) => {
  const secret = passwordResetSecret + currentPassword;
  return verify(passwordResetToken, secret);
};
