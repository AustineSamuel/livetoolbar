export interface User{
    username:string,
    fullname:string,
    email:string,
    password:string,
    NIN:string,
    photo:string,
    createdAt:string,
    updated:string,
    passwordChangedAt:string,
    recentPasswords:string[],
    userId:string,
    balance:number,
    balance_before:number,
    balance_updatedAt:string,
    docId?:string 
    
}