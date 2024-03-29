import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Articles } from "./Articles";
import { Vote } from "./Vote";

enum UserRoles {
  USER = "user",
  ADMIN = "admin",
}

enum UserGender {
  MEN = "Laki-laki",
  MALE = "Perempuan",
}

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column({ type: "enum", enum: UserGender, default: UserGender.MEN })
  gender: UserGender;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @CreateDateColumn()
  createdDate: Date;

  @OneToMany(() => Articles, (articles) => articles.users, {
   onDelete: "CASCADE", onUpdate: "CASCADE"
  })
  articles: Articles[];

  @ManyToOne(() => Vote, (votes) => votes.users)
  @JoinColumn({ name: "voteId" })
  votes: Vote;
}
