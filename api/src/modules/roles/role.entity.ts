import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  description: string;

  @Column({nullable: true})
  notes: string;

}