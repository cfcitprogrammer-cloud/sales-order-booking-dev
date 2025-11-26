export function convertTo12HourFormat(time) {
  if (!time) return "N/A"; // Handle case where time is null or undefined

  const [hours, minutes] = time.split(":");

  // Create a new Date object and set the time based on the provided time
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0); // Set seconds to 0 for consistency

  // Format the time to 12-hour format with AM/PM
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
