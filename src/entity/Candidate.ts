import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  candidate_name: string;

  @Column()
  serial_number: number;

  @Column()
  vision_mission: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

//   @OneToMany(() => Vote, (votes) => votes.candidates) 
//   votes: Vote[]
}
