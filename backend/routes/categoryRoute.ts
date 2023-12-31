import express, { Router } from "express";
import { getCategories, setCategory } from "../controller/categoryController";

const categoryRouter = Router();

categoryRouter.route("/create").post(setCategory as any);
categoryRouter.route("/").get(getCategories as any);

export default categoryRouter;
