import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Recipe{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  label: string;
  
  
  @Column({ default: null })
  image: string;

  @Column()
  recipeUri: string;

}