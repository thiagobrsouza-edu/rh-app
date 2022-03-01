import { Router } from "express";
import { departmentRoute } from "./modules/departments/department.route";
import { roleRoute } from "./modules/roles/role.route";

export const routes = Router();

routes.use('/departments', departmentRoute);
routes.use('/roles', roleRoute);