import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Allergie } from "./user-allergy.entity";


@Entity()
export class User{
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column({ default: null })
  token: string;

  @Column()
  gender:string;

  @Column()
  birth: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @JoinTable()
  @OneToMany(
    type => Allergie, 
    allergie => allergie.user,
    {
      cascade: true,
    })
  allergies: Allergie[];

}