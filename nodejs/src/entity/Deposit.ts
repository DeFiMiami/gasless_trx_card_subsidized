import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Deposit {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: number

    @Column()
    userId: number

    @Column()
    stripeId: string

    @Column()
    amount: number

}