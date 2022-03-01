import { IDepartment } from "../departments/IDepartment";
import { IRole } from "../roles/IRole";

export interface IEmployee {

  id?: any;
  name?: string;
  cpf?: string;
  birthDate?: string;
  admission?: string;
  resignation?: string;
  salary?: number;
  role?: IRole;
  department?: IDepartment;
  
}