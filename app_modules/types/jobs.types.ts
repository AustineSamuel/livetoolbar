export interface Jobs{
    docId?:string,
    jobId:string,
    name:string,
    createdAt:string,
    workersNeeded:number,
    description:string,
    tags:string[],
    postedBy:string,
    documents:string[],
closed?:boolean,
closedAt:string
}