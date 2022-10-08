import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: number

    @Column()
    address: string

}
