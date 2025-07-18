export interface bookings{
    type:"serviceBooking" | "service" | "" | "",
    transactionId:string,
    status:"pending" | 'working' |"completed" |"failed"|"canceled",
    amount:number,
    paid:boolean,
    finishedServiceAt:string,
    serviceStartedAt:string,
    review:{message:string,stars:number},
    serviceDoneBy:{
        id:string,
        personName:string,
        personPic:string,
    },
    

}