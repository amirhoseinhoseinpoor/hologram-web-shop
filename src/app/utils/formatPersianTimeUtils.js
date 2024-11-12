// utils/dateUtils.js  
export const formatPersianTime = (isoDate) => {  
    const date = new Date(isoDate);  
  
    // Check if the date is valid  
    if (isNaN(date.getTime())) {  
      console.error("Invalid date:", isoDate); // Log the invalid date  
      return "Invalid date"; // Return an appropriate fallback or error message  
    }  
  
    const persianTimeFormatter = new Intl.DateTimeFormat("fa-IR", {  
      hour: "numeric",  
      minute: "numeric",  
      second: "numeric",  
      hour12: false, // Use 24-hour format  
    });  
  
    return persianTimeFormatter.format(date);  
  };