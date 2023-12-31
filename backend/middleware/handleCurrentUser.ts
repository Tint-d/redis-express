import { NextFunction, Request, Response } from "express";
import {
  decodeRefreshToken,
  getTokenFromTokenHeader,
  verifyAccessToken,
} from "../utils/jwt";
import { BadRequest, Forbidden, Unauthorized } from "../utils/appErrors";
import { getUserRefreshToken } from "../services/userService";

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

export const authorizeAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tokenHeader = req.header("Authorization") as string;
    const token = getTokenFromTokenHeader(tokenHeader);
    const decoded = verifyAccessToken(token);
    const user = decoded as User;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TypeError") {
        next(new BadRequest("No token Provided"));
      } else if (error.name === "JsonWebTokenError") {
        next(new BadRequest("Invalid Token"));
      } else if (error.name === "TokenExpiredError") {
        next(new BadRequest("Token Expired"));
      } else {
        next(error);
      }
    }
  }
};

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as User;
    if (user.role !== "ADMIN") {
      throw new Forbidden("Access Denied");
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const authorizeRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenHeader = req.header("Authorization");

    const token = getTokenFromTokenHeader(tokenHeader as string);

    const decoded = decodeRefreshToken(token);
    console.log(decoded);

    if (typeof decoded === "object" && "email" in decoded) {
      const tokenCache = await getUserRefreshToken(decoded.email);
      if (tokenCache === token) {
        console.log("abc");
        const user = decoded as User;
        req.user = user;
        next();
      }
    } else {
      throw new Unauthorized("Invalid refresh token");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      if (error.name === "TypeError") {
        next(new BadRequest("No token Provided"));
      } else if (error.name === "JsonWebTokenError") {
        next(new BadRequest("Invalid Token"));
      } else if (error.name === "TokenExpiredError") {
        next(new BadRequest("Token Expired"));
      }
      next(error);
    }
  }
};
