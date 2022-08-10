
export function getCurrTimeEST() {
  const newYorkDateTimeStr = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  return new Date(newYorkDateTimeStr);
}

export function getTimestampStringEST(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString("en-US", { timeZone: "America/New_York" })
}