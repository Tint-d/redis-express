import { Request, Response, NextFunction } from "express";
import { getSkipAndTake } from "../utils/offsetPagnation";

declare module "express" {
  interface Request {
    take?: number;
    skip?: number;
  }
}

export const pagination = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, page, size } = req.query as {
      category: string;
      page: string;
      size: string;
    };
    const { take, skip } = getSkipAndTake(page, size);

    const stringSkip = String(skip);
    const stringTake = String(take);

    req.query.category = category;
    req.query.take = stringTake;
    req.query.skip = stringSkip;

    next();
  } catch (error) {
    res.send(error);
  }
};
