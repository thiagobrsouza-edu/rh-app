import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('departments')
export class Department {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  description: string;

  @Column({nullable: true})
  notes: string;

}