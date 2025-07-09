export const getErrorMessage = (error: any): string => {
    try {
      const resData = error?.response?.data;
  
      // Case 1: message is a string or array
      if (resData?.message) {
        return Array.isArray(resData.message)
          ? resData.message.join(', ')
          : resData.message;
      }
  
      // Case 2: errors is an array of objects
      if (Array.isArray(resData?.errors)) {
        return resData.errors
          .map((e: any) => (e.message || JSON.stringify(e)))
          .join(', ');
      }
   if(resData?.error) return resData.error
      // Case 3: errors is an object (e.g., field: [msg])
      if (typeof resData?.errors === 'object' && resData.errors !== null) {
        return Object.values(resData.errors)
          .flat()
          .join(', ');
      }
  
      // Fallback
      return error?.message || null;
    } catch {
      return 'An unexpected error occurred';
    }
  };
  

  export const getErrorMessageOld=(error:any)=>{
    const errorMessage =
          error.response?.data?.message || // Message from API response
          error.message || // Default error message
          "An unknown error occurred"; // Fallback message
          return errorMessage
  }