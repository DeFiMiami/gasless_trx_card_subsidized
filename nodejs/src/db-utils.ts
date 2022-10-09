import {AppDataSource} from "./data-source";
import {User} from "./entity/User";
import {Deposit} from "./entity/Deposit";
import {UserOperation} from "./entity/UserOperation";

export async function getUserAddress(userAddress: string) {
    return await AppDataSource.getRepository(User).findOne({where: {address: userAddress}})
}

export async function getUserBalance(address: string) {
    const depositsSum = await AppDataSource.getRepository(Deposit)
        .createQueryBuilder("deposit")
        .select("SUM(deposit.amount)", "sum")
        .getRawOne();
    const deposits = depositsSum.sum
    const chargeSum = await AppDataSource.getRepository(UserOperation)
        .createQueryBuilder("uo")
        .select("SUM(uo.usdCost)", "sum")
        .getRawOne();
    const charge = chargeSum.sum
    console.log('balance', deposits)
    console.log('charge', charge)
    return deposits - charge;
}