import { Router } from "express";
import { departmentRoute } from "./modules/departments/department.route";
import { employeeRoute } from "./modules/employees/employee.route";
import { roleRoute } from "./modules/roles/role.route";

export const routes = Router();

routes.use('/departments', departmentRoute);
routes.use('/roles', roleRoute);
routes.use('/employees', employeeRoute);