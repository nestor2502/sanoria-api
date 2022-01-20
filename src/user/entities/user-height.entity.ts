import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";


@Entity()
export class Height_Log{
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  height: number;

  @Column()
  date: string;

  @Column()
  userId: number;

}