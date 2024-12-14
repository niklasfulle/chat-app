// Extracts the time portion from a given date string.
export function extractTime(dateString: string) {
  // Create a Date object from the given date string
  const date = new Date(dateString);

  // Extract hours and minutes, padding single-digit values with a leading zero
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  // Return the formatted time string
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: number) {
  return number.toString().padStart(2, "0");
}