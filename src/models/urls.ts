import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Url {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  token: string;

  @Column()
  og_url: string;

  @Column()
  short_url: string;
}
