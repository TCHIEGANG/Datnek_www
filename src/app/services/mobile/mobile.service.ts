import {HostListener, Injectable} from '@angular/core';
import {ScreenHelper} from "../../helpers/screen-helper";

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  public screenWidth: number = window.innerWidth;

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.screenWidth = window.innerWidth;
  }

  isMobile(screenWidth): boolean {
    return ScreenHelper.isMobile(screenWidth);
  }

  setSkillschatDesign(): void{
    if (this.isMobile(this.screenWidth)){
      localStorage.setItem('design', 'skillschat');
    }
  }

  unsetSkillschatDesign(): void{
    localStorage.removeItem('design');
  }

}
