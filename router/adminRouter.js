import express from "express";
import { getAdminProfile } from "../controller/adminController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const adminRouter = express.Router();

adminRouter.get(
  "/profile/me",
  authenticate,
  restrict(["admin"]),
  getAdminProfile
);
export default adminRouter;
