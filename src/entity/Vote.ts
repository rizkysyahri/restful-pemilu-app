import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Candidate } from "./Candidate";
import { Users } from "./User";
  
  @Entity()
  export class Vote {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    candidate_id: number;
  
    @Column()
    user_id: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @CreateDateColumn()
    updated_at: Date;
  
    // @ManyToOne(() => Candidate, (candidates) => candidates.votes) 
    // candidates: Candidate[]

    // @ManyToOne(() => Users, (users) => users.votes)
    // users: Users
  }
  