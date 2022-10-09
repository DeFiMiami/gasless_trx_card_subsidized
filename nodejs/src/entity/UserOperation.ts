import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserOperation {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: number

    @Column()
    userId: number

    @Column({nullable: true})
    sponsorTxHash: string

    @Column({nullable: true})
    sponsorTxSerialized: string

    @Column({nullable: true})
    userTxHash: string

    @Column({nullable: true})
    userTxSerialized: string

    @Column({nullable: true})
    usdCost: number
}
