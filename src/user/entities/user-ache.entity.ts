import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";


@Entity()
export class Ache_Log{
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  ache: string;

  @Column()
  date: string;
  
  @Column()
  userId: number;

}