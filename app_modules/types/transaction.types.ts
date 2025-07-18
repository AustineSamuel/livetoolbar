export interface transactions{
    ref:string,
    id:string,
    docId?:string,
    amountBefore:number,
    amountAfter:number,
    createdAt:string,
    updatedAt:string,
    status:"pending" |"success" |"failed" |"expired",
    data:any,
    message:string,
    transactionAmount:number
}