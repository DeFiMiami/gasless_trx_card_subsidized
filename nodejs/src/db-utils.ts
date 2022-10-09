import {AppDataSource} from "./data-source";
import {User} from "./entity/User";

export async function getUserAddress(userAddress: string) {
    return await AppDataSource.getRepository(User).findOne({where: {address: userAddress}})
}