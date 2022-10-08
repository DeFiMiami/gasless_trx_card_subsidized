import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: number

    @Column()
    userId: number

    @Column()
    subTxHash: string

    @Column()
    subTx: string

    @Column()
    origTxHash: string

    @Column()
    origTx: string

    @Column()
    usdCost: number
}
