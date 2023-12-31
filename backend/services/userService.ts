import { cacheClient } from "../cache/cacheDBInit";
import { prisma } from "../db/prisma";
import { getRefreshTokenCacheEX, getVerifyEmailEX } from "../utils/appConfig";

export const fetchUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const fetchUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const setUserSignUpCache = async (
  email: string,
  user: any
): Promise<void> => {
  const verifyEmailEX: any = getVerifyEmailEX();
  console.log("user is signupCache", user, email);

  const redisEmail = await cacheClient.set(email, JSON.stringify(user), {
    EX: verifyEmailEX,
  });
  console.log(redisEmail, "redisEmail");
};

export const getUserSignUpCache = async (email: string): Promise<any> => {
  if (email !== null) {
    const cacheData = await cacheClient.get(email); // Wait for the promise to resolve
    if (cacheData !== null) {
      const parsedData = JSON.parse(cacheData); // Parse the resolved data
      return parsedData;
    }
  }
};

export const deleteUserSignUpCache = async (email: string): Promise<void> => {
  await cacheClient.del(email);
};

export const setUserRefreshToken = async (
  email: string,
  refreshToken: string
): Promise<void> => {
  const refreshTokenCacheEX: any = getRefreshTokenCacheEX();
  await cacheClient.set(email, refreshToken, { EX: refreshTokenCacheEX });
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const userQuantity = await prisma.user.count();
  const role = userQuantity === 0 ? "ADMIN" : "USER";
  return await prisma.user.create({
    data: {
      email,
      name,
      password,
      role,
    },
  });
};

export const deleteUserRefreshToken = async (email: string): Promise<void> => {
  const data = await cacheClient.del(email);
  // console.log("cacheClient", data);
};

export const updateUserPassword = async (
  userId: string,
  newPassword: string
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newPassword,
    },
  });
};

export const getUserRefreshToken = async (email: string) => {
  return await cacheClient.get(email);
};
