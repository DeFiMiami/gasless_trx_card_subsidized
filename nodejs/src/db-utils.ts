import {AppDataSource} from "./data-source";
import {User} from "./entity/User";
import {Deposit} from "./entity/Deposit";
import {UserOperation} from "./entity/UserOperation";

export async function getUserAddress(userAddress: string) {
    return await AppDataSource.getRepository(User).findOne({where: {address: userAddress}})
}

export async function getUserUsdBalance(userAddress: string) {
    let addressLowerCase = userAddress.toLowerCase();
    let user = await AppDataSource.getRepository(User)
        .findOne({where: {address: addressLowerCase}})
    if (user === null) {
        console.log('UserBalance_USD_cents', addressLowerCase, "not found")
        return 0
    }
    const depositsSum = await AppDataSource.getRepository(Deposit)
        .createQueryBuilder("deposit")
        .select("SUM(deposit.amount)", "sum")
        .where({userId: user.id})
        .getRawOne();
    const deposits = depositsSum.sum
    const chargeSum = await AppDataSource.getRepository(UserOperation)
        .createQueryBuilder("uo")
        .select("SUM(uo.usdCost)", "sum")
        .where({userId: user.id})
        .getRawOne();
    const charge = chargeSum.sum
    let totalBalance = deposits - charge;
    console.log('UserBalance_USD_cents', addressLowerCase, totalBalance)
    return totalBalance;
}