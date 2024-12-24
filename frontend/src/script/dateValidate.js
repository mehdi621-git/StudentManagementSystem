function isValidDate(dateStr) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;  // Regex pattern for YYYY-MM-DD format
    
    if (!datePattern.test(dateStr)) {
      return false; // Invalid format
    }
    
    // Check if the date is a valid date
    const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
    
    // Check if the date exists
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
  }
  export default isValidDate