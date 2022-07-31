
export function getCurrTimeEST() {
  const newYorkDateTimeStr = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  return new Date(newYorkDateTimeStr);
}