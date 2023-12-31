import { prisma } from "../db/prisma";

export const createProfile = async (
  userId: string,
  phone: string,
  address: string
): Promise<{
  id: string;
  phone: string;
  address: string;
  userId: string;
}> => {
  return await prisma.profile.create({
    data: {
      userId: userId,
      phone: phone,
      address: address,
    },
  });
};

export const fetchProfile = async (
  userId: string
): Promise<{
  id: string;
  phone: string;
  address: string;
  userId: string;
} | null> => {
  return await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
  });
};

export const updatedProfile = async (
  userId: string,
  phone: string,
  address: string
): Promise<{
  id: string;
  phone: string;
  address: string;
  userId: string;
}> => {
  return await prisma.profile.update({
    where: {
      userId: userId,
    },
    data: {
      userId: userId,
      phone: phone,
      address: address,
    },
  });
};

export const fetchProfileAddress = async (userId: string) => {
  return await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
    select: {
      address: true,
    },
  });
};
