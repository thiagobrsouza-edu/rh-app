import { Router } from "express";
import { departmentRoute } from "./modules/department/department.route";

export const routes = Router();

routes.use('/departments', departmentRoute);