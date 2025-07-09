import { baseURL } from "@/api/base";

export const formatTimestamp = (input: any): string => {
    let date: Date;
  
    if (typeof input === 'string') {
      date = new Date(input);
    } else if (input?.seconds !== undefined) {
      date = new Date(input.seconds * 1000);
    } else {
      return 'Invalid date';
    }
  
    return date.toLocaleString(undefined, {
      // year: 'numeric',
      // month: 'short',
      // day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };
  


  export const replaceUndefined=(str: any): string => {
  return str.replace(/undefined/g, '');
};
  
export const addHTTPPath=(path: string): string =>path?.includes("http") ? path : `${baseURL}/${path}`