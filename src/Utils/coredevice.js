export function GetSimplifiedPlatformString() {
  if (window !== undefined && window.device !== undefined && window.device.platform !== undefined) {
    const plText = window.device.platform.toUpperCase();

    if (plText.includes("WINDOWS")) 
      return "WINDOWS";
      
    if (plText.includes("MAC OS X")) 
      return "MAC OS X";

    if (plText.includes("OS X"))
      return "MAC OS X";

    if (plText.includes("ANDROID"))
      return "ANDROID";

    if (plText.includes("IOS")) 
      return "IOS";

    return "UNKNOWN";

  } else return "BROWSER";
}
