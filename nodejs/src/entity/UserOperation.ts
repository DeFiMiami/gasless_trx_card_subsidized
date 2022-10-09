import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserOperation {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: number

    @Column()
    userId: number

    @Column()
    sponsorTxHash: string

    @Column()
    sponsorTxSerialized: string

    @Column()
    userTxHash: string

    @Column()
    userTxSerialized: string

    @Column()
    usdCost: number
}
