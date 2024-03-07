import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./User";

@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @CreateDateColumn()
  publication_date: Date;

  @Column()
  image: string;

  @Column({type: 'text'})
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (users) => users.articles)
  @JoinColumn({ name: "userId" })
  users: Users;
}
