import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";


@Entity()
export class Allergie {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @ManyToOne(() => User, user => user.allergies)
  user: User;

}