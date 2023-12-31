import { NextFunction, Request, Response } from "express";
import {
  createProfile,
  fetchProfile,
  updatedProfile,
} from "../services/profileService";
import { Conflict, NotFound } from "../utils/appErrors";

export const setProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body.user as { userId: string };
    const { phone, address } = req.body as { phone: string; address: string };
    await createProfile(userId, phone, address);
    res.status(201).json({
      success: true,
      message: `Profile has been created`,
    });
  } catch (error) {
    if ((error as any).code === "P2002") {
      next(new Conflict("Profile already exists for this user"));
    } else {
      next(error);
    }
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body.user as { userId: string };
    const profile = await fetchProfile(userId);
    if (!profile) throw new NotFound("Profile is not exist!");
    res.status(200).json({
      success: true,
      message: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const modifyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body.user as { userId: string };
    if (!userId) {
      throw new NotFound("Profile is not exist!");
    }
    const { phone, address } = req.body as { phone: string; address: string };
    const updateProfile = await updatedProfile(userId, phone, address);
    res.status(200).json({
      success: true,
      message: updateProfile,
    });
  } catch (error) {
    next(error);
  }
};
