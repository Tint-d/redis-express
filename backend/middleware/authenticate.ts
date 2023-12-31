import { Response, Request, NextFunction } from "express";
import { Unauthorized } from "../utils/appErrors";
import { getTokenFromTokenHeader, verifyAccessToken } from "../utils/jwt";

// declare module "express" {
//   interface Request {
//     user?: any; // You can replace 'any' with the type of your user object
//   }
// }

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.headers.authorization as string;
    const token = getTokenFromTokenHeader(accessToken);

    if (!token) {
      throw new Unauthorized("Authentication required.");
    }

    const decoded = verifyAccessToken(token);
    const user = decoded as User;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
