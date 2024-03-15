import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Parties {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parties_name: string;

  @Column()
  parties_chairman: string;

  @Column()
  vision_mission: string;

  @Column()
  parties_address: string;

  @Column()
  parties_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
