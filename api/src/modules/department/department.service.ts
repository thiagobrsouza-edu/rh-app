import { getRepository } from "typeorm";
import { Department } from "./department.entity";

export const useDepartmentService = () => {

  const save = async (department: Department) => {
    const { description, notes } = department;
    const exists = await getRepository(Department).findOne({where: {description: description}});
    if (exists) {
      throw new Error('Departamento já registrado!');
    } else {
      await getRepository(Department).save(department);
      return department;
    }
  }

  const list = async () => {
    const departmentList = await getRepository(Department).find();
    return departmentList;
  }

  const getOne = async (id: number) => {
    const department = await getRepository(Department).findOne(id);
    return department;
  }

  const update = async (id: number, department: Department) => {
    const { description, notes } = department;
    const departmentFounded = await getRepository(Department).findOne(id);
    const exists = await getRepository(Department).findOne({where: {description: description}});
    if (exists && (exists.id !== departmentFounded.id)) {
      throw new Error('Departamento já registrado!');
    } else {
      departmentFounded.description = department.description;
      departmentFounded.notes = department.notes;
      await getRepository(Department).save(departmentFounded);
      return departmentFounded;
    }
  }

  const deleteOne = async (id: number) => {
    try {
      await getRepository(Department).delete(id);
    } catch {
      throw new Error('Departamento não pode ser removido. Há associações com esse objeto!');
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