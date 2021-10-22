export class ScreenHelper {
  static isMobile(width: number): boolean {
    const SCREEN_SIZE_SM = 576;
    const SCREEN_SIZE_MD = 768;
    const SCREEN_SIZE_LG = 992;
    const SCREEN_SIZE_XL = 1200;
    return width <= SCREEN_SIZE_MD;
  }
}
