import { getCurrentTimestamp } from '@/Logics/DateFunc';
import { docQr } from '@/Logics/docQr'
import { updateData } from '@/Logics/updateData';
import { User } from '@/types/user.types'

export interface ChargeUserResult {
  user: User | null;
  error?: string;
}
const chargeUser = async (amount: number, userId: string): Promise<ChargeUserResult> => {
  try {
    const userNow = await docQr("Users", {
      whereClauses: [
        {
          field: "userId",
          operator: "==",
          value: userId,
        },
      ],
    });

    if (userNow?.[0]) {
      const user: User = userNow[0];
      // Here you might want to deduct balance or update user — implement logic as needed
if(user?.balance<amount)return {
    user,
    error:"Insuffient ballance please fund your wallet to try again"
}
//user has the amount
const ballanceNow=user?.balance - amount
//update user
const updatedUser:User={
    ...user,
    balance:ballanceNow,
    balance_before:user?.balance,
    balance_updatedAt:getCurrentTimestamp(),

}
const updatedUserEvent=await updateData("Users",user?.docId||"",{
...updatedUser
})

      return {
        user:updatedUser,
      };
    } else {
      return {
        user: null,
        error: "User with id not found",
      }
    }
  } catch (err) {
    return {
      user: null,
      error: "Something went wrong while charging the user.",
    };
  }
};

export default chargeUser;
