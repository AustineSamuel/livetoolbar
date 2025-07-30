import { User } from "@/types/user.types";
export type latitude=number;
export type longitude=number;
export interface ServiceProviders{
    uid:string,
    jobType:string,
    jobId:string,//type of job person is providing
    profile:string,
    user:User,
    currentProviderLocation:[latitude,longitude],
}