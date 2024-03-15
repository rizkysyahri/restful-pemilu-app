import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Candidate } from "./Candidate";
import { Users } from "./User";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Candidate, (candidates) => candidates.votes)
  @JoinColumn({ name: "candidateId" })
  candidates: Candidate;

  @OneToMany(() => Users, (users) => users.votes)
  @JoinColumn({ name: "userId" })
  users: Users;
}
