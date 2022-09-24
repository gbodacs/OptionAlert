import {GetSimplifiedPlatformString} from "./coredevice"

export enum ePlatforms {
  Mobile,
  Desktop,
  Web,
  Unknown
}

export function getPlatformEnum() : ePlatforms {
  const platformString = GetSimplifiedPlatformString()

  if (platformString === "BROWSER")
    return ePlatforms.Web;

  if ( (platformString === "ANDROID") || (platformString === "IOS"))
    return ePlatforms.Mobile

  if ( (platformString === "WINDOWS") || (platformString === "MAC OS X"))
    return ePlatforms.Desktop

  if (platformString === "UNKNOWN")
    return ePlatforms.Unknown

  return ePlatforms.Unknown
}

export function getPlatformString(): string {
  const plat1 = getPlatformEnum()
  let plaString = "Unknown"
  switch (plat1)
  {
    case ePlatforms.Desktop:
      plaString = "Desktop";
      break;
    case ePlatforms.Mobile:
      plaString = "Mobile";
      break;
    case ePlatforms.Web:
      plaString = "Web";
      break;
    case ePlatforms.Unknown:
    default:
      plaString = "Unknown";
  }
  return plaString;
}