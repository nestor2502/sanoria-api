import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";


@Entity()
export class Weight_Log{
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  weight: number;

  @Column()
  date: string;
  
  @Column()
  userId: number;

}