
// Declare objects for Cordova
declare let /*window: any,*/ device: any;

export enum ePlatforms {
  Mobile,
  Desktop,
  Web
}

export function getPlatform() : ePlatforms {
  if (typeof(device) === 'undefined' || !device ) {
    return ePlatforms.Web;
  }

  const pl = device.platform.toUpperCase()
  if (pl === "BROWSER")
    return ePlatforms.Web;

  if ( (pl === "ANDROID") || (pl === "IOS"))
    return ePlatforms.Mobile

  if ( (pl === "WINDOWS") || (pl === "OS X") || (pl === "MAC OS X"))
    return ePlatforms.Desktop
  
  return ePlatforms.Desktop
}