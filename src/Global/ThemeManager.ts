// import logger from "../Utils/logger";



export default class ThemeManager {
  private themeName: string = "dark";

  private setTheme(t:string) {
    document.getElementsByTagName('html')[0].setAttribute('data-theme', t)
  }

  public getCurrentTheme(): string {
    return this.themeName;
  }

  public setCurrentTheme(t: string) {
    this.themeName = t;
    this.setTheme(t)
  }
}