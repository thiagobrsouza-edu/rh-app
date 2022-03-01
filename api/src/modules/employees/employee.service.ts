import { getRepository } from "typeorm";
import { Employee } from "./employee.entity";

export const useEmployeeService = () => {

  const save = async (employee: Employee) => {
    const { name, cpf, birthDate, admission, resignation, salary, department, role } = employee;
    const exists = await getRepository(Employee).findOne({where: {cpf: cpf}});
    if (exists) {
      throw new Error('Funcionário já registrado!');
    } else {
      await getRepository(Employee).save(employee);
      return employee;
    }
  }

  const list = async () => {
    const employeeList = await getRepository(Employee).find({relations: ['role', 'department']});
    return employeeList;
  }

  const getOne = async (id: number) => {
    const employee = await getRepository(Employee).findOne(id, {relations: ['role', 'department']});
    return employee;
  }

  const update = async (id: number, employee: Employee) => {
    const { name, cpf, birthDate, admission, resignation, salary, department, role } = employee;
    const employeeFounded = await getRepository(Employee).findOne(id);
    const exists = await getRepository(Employee).findOne({where: {cpf: cpf}});
    if (exists && (exists.id !== employeeFounded.id)) {
      throw new Error('Funcionário já registrado!');
    } else {
      employeeFounded.name = employee.name;
      employeeFounded.cpf = employee.cpf;
      employeeFounded.birthDate = employee.birthDate;
      employeeFounded.admission = employee.admission;
      employeeFounded.resignation = employee.resignation;
      employeeFounded.salary = employee.salary;
      employeeFounded.role = employee.role;
      employeeFounded.department = employee.department;
      await getRepository(Employee).save(employeeFounded);
      return employeeFounded;
    }
  }

  const deleteOne = async (id: number) => {
    try {
      await getRepository(Employee).delete(id);
    } catch {
      throw new Error('Funcionário não pode ser removido!');
    }
  }
  
  return {
    save,
    list,
    getOne,
    update,
    deleteOne
  }

}