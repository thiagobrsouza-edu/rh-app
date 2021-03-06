import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "../departments/department.entity";
import { Role } from "../roles/role.entity";

@Entity('employees')
export class Employee {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: false})
  name: string;

  @Column({nullable: false, unique: true})
  cpf: string;

  @Column({nullable: false})
  birthDate: string;

  @Column({nullable: false})
  admission: string;

  @Column({nullable: true})
  resignation: string;

  @Column({nullable: false, type: 'decimal', precision: 15, scale: 2})
  salary: number;

  @ManyToOne(() => Role, role => role.employees)
  role: Role;

  @ManyToOne(() => Department, department => department.employees)
  department: Department;

}