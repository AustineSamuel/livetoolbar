
export type url=string
export type Date_=string;

export interface file  {
        type:"image" | "video" | "file" | "audio",//no file sharing for now
        name:string,
        size:number,
        url:url
    }

export interface messages_relationShips{
    personId:string,
    personName:string,
    personPicture:url,
    messages:message[],
    lastMessage:message,
    messageCollection:string,
    partnerId:string,
    partnerName:string,
    partnerPicture:url,
    createdAt:Date_,
    initiatedBy:string//person id
}


export interface message{
docId?:string,
text:string,
files:file[],
sentAt:string,
receivedAt:string,
status:'sent'| "delivered" | "read" | "seen" | 'failed',
reactions?:reaction[],
senderId:string,
senderPicture:url,
receiverId:string
type:"text"| 'business' | "file" | "image" | "video" | "audio",//
businessType?:'driving'|'property'|'car-renting',//for business messages
messageBusinessId?:string//linked to specifit message in chat by messageBusinessId
}
export interface reaction{
    emojiCode:string | number,
    text:string,
    personName:string,
    personId:string,
    personPicture:url
}
export interface reply{
    text:string,
    files:url,
    originalMessageId:string
}

export interface onGoingBusiness{
docId?:string,
type:"driving"|'property'|'car-renting',
propertyId:string,
data?:any,
createdAt:string,
status:"ongoing"|'completed'|'cancelled'
actionButton?:{
name:"make-payment" |"book" | 'count-down', 
lable:"Make payment" |"Book" | 'Count Down'
}
statusUpdatedAt?:string,
updateAt?:string,
messageBusinessId:string,//linked to specifit message in chat by messageBusinessId
chatId:string//the messaging collection name of the chat
}