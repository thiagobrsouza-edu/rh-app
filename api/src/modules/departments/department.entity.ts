import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../employees/employee.entity";

@Entity('departments')
export class Department {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  description: string;

  @Column({nullable: true})
  notes: string;

  @OneToMany(() => Employee, employee => employee.department)
  employees: Employee[];

}