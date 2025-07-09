export const getUnit=(typeName:string):string=>{
 switch (typeName) {
    case 'per_week':
        return 'Per Week';
        break;
 case 'per_month':
        return 'Per Month';
    default:
        return ""
        break;
 }   
}