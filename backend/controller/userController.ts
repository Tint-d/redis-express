import { NextFunction, Request, Response } from "express";
import {
  createUser,
  deleteUserRefreshToken,
  deleteUserSignUpCache,
  fetchUserByEmail,
  fetchUserById,
  getUserSignUpCache,
  setUserRefreshToken,
  setUserSignUpCache,
  updateUserPassword,
} from "../services/userService";
import { BadRequest, Unauthorized } from "../utils/appErrors";
import { compareHashedPassword, generateHashedPassword } from "../utils/hash";
import {
  decodePasswordResetToken,
  decodeVerificationToken,
  generateAccessToken,
  generatePasswordResetToken,
  generateRefreshToken,
  generateVerificationToken,
} from "../utils/jwt";
import { sendVerificationEmail } from "../utils/email";
import { prisma } from "../db/prisma";

interface AuthencationBaseType {
  email: string;
  password: string;
}

interface SingUpType extends AuthencationBaseType {
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

declare module "express" {
  interface Request {
    user?: User;
  }
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body as SingUpType;

    const user = await fetchUserByEmail(email);

    if (user !== null) {
      throw new BadRequest("User already have an account!");
    }

    const hashedPassword = await generateHashedPassword(password);
    const verificationToken = await generateVerificationToken(email);
    const link = `localhost:3000/api/v1/users/verify/${verificationToken}`;
    await sendVerificationEmail(email, link);
    await setUserSignUpCache(email, {
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: `Verification link has been sent to ${email} and token is ${verificationToken}`,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.params.token;

    const decodedToken = decodeVerificationToken(token);
    console.log(decodedToken, "decodedToken");

    if (typeof decodedToken === "object" && "email" in decodedToken) {
      const { email } = decodedToken as { email: string };
      const userCache = await getUserSignUpCache(email);
      console.log(userCache, "usercache");
      if (!email || email !== userCache.email) {
        throw new BadRequest("Invalid Verification Token");
      }
      const user = await createUser(
        userCache.name,
        userCache.email,
        userCache.password
      );
      await deleteUserSignUpCache(email);
      const accessToken = generateAccessToken(user.email, user.id, user.role);
      const refreshToken = generateRefreshToken(user.email, user.id, user.role);
      await setUserRefreshToken(email, refreshToken);
      res.status(201).json({
        success: true,
        message: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const userCache = await getUserSignUpCache(email);

    if (!userCache) {
      throw new BadRequest("Invalid request");
    }
    const verificationToken = generateVerificationToken(email);
    const link = `localhost:3001/api/v1/users/verify/${verificationToken}`;
    await setUserSignUpCache(email, link);
    await sendVerificationEmail(email, link);
    return res.status(201).json({
      success: true,
      message: `verification link has been sent to ${email},${verificationToken}`,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, id, role } = req.user!;
    const accessToken = generateAccessToken(email, id, role);
    const refreshToken = generateRefreshToken(email, id, role);
    await setUserRefreshToken(email, refreshToken);
    res.status(200).json({
      success: true,
      message: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as AuthencationBaseType;

    const user: User | null = await fetchUserByEmail(email);

    if (!user || !(await compareHashedPassword(password, user.password))) {
      throw new Unauthorized("Invaild email or password!");
    }
    const accessToken = generateAccessToken(user.email, user.id, user.role);
    const refreshToken = generateRefreshToken(user.email, user.id, user.role);

    res.status(200).json({
      success: true,
      message: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body as { email: string };
    console.log(email);

    await deleteUserRefreshToken(email);
    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email as string;
    const user = await fetchUserByEmail(email);
    if (!user) throw new Unauthorized("There is no user with this email");
    const token = generatePasswordResetToken(email, user.password);
    const resetLink = `localhost:3001/api/v1/users/reset/${user.id}/${token}`;
    await sendVerificationEmail(email, resetLink);
    res.status(200).json({
      success: true,
      message: `Email has been sent to ${email}`,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email as string;
    const password = req.body.password as string;
    const user = await fetchUserByEmail(email);
    if (!user || !compareHashedPassword(password, user.password)) {
      throw new BadRequest("Invalid email or password!");
    }
    const token = generatePasswordResetToken(email, user.password);
    const resetLink = `localhost:3001/api/v1/users/reset/${user.id}/${token}`;
    await sendVerificationEmail(email, resetLink);
    res.status(200).json({
      success: true,
      message: `Email has been sent ${email}`,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, token } = req.params as { userId: string; token: string };
    const { newPassword } = req.body as { newPassword: string };
    const hashedPassword = await generateHashedPassword(newPassword);
    const user = await fetchUserById(userId);
    if (!user) throw new Unauthorized("Invalid user!");
    const decoded = decodePasswordResetToken(token, user.password);
    if (!decoded) throw new BadRequest("Invalid token");
    const { email, id, role } = await updateUserPassword(
      userId,
      hashedPassword
    );
    const accessToken = generateAccessToken(email, id, role);
    const refreshToken = generateRefreshToken(email, id, role);
    await setUserRefreshToken(email, refreshToken);
    res.status(200).json({
      success: true,
      message: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body as { userId: string };
    await prisma.user.deleteMany({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ message: `${userId} is delete!` });
  } catch (error) {
    next(error);
  }
};
