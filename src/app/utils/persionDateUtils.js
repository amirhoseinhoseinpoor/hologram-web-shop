// utils/dateUtils.js
export const formatPersianDate = (isoDate) => {
  const date = new Date(isoDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", isoDate); // Log the invalid date
    return "Invalid date"; // Return an appropriate fallback or error message
  }
  
  const persianFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return persianFormatter.format(date);
};
