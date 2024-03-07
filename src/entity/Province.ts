import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "provinces"})
export class Province {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

}
