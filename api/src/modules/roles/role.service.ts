import { getRepository } from "typeorm";
import { Role } from "./role.entity";

export const useRoleService = () => {

  const save = async (role: Role) => {
    const { description, notes } = role;
    const exists = await getRepository(Role).findOne({where: {description: description}});
    if (exists) {
      throw new Error('Cargo já registrado!');
    } else {
      await getRepository(Role).save(role);
      return role;
    }
  }

  const list = async () => {
    const roleList = await getRepository(Role).find();
    return roleList;
  }

  const getOne = async (id: number) => {
    const role = await getRepository(Role).findOne(id);
    return role;
  }

  const update = async (id: number, role: Role) => {
    const { description, notes } = role;
    const roleFounded = await getRepository(Role).findOne(id);
    const exists = await getRepository(Role).findOne({where: {description: description}});
    if (exists && (exists.id !== roleFounded.id)) {
      throw new Error('Cargo já registrado!');
    } else {
      roleFounded.description = role.description;
      roleFounded.notes = role.notes;
      await getRepository(Role).save(roleFounded);
      return roleFounded;
    }
  }

  const deleteOne = async (id: number) => {
    try {
      await getRepository(Role).delete(id);
    } catch {
      throw new Error('Cargo não pode ser removido. Há associações com esse objeto!');
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