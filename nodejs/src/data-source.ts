import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entity/User"
import {UserOperation} from "./entity/UserOperation"
import {Deposit} from "./entity/Deposit";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.data",
    synchronize: true,
    logging: false,
    entities: [User, UserOperation, Deposit],
    migrations: [],
    subscribers: [],
})
