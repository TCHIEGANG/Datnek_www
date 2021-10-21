import {Component, NgModule, OnInit} from '@angular/core';
import {LanguageHelper} from "../../helpers/language-helper";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  languages: InfoLanguageType[] = LanguageHelper.languageTypes;
  currentLanguageCode: string;
  selectedLanguage: InfoLanguageType;
  eventColor: string;
  eventTitle: string;

  constructor(public translate: TranslateService)
  {

  }

  ngOnInit(): void {
    this.eventTitle = 'Modal closed';
    this.eventColor = 'gray';
    this.selectedLanguage = LanguageHelper.languageTypes[1];
    this.currentLanguageCode = this.selectedLanguage.code;
  }

  onClickTab(language: any): void {
    this.selectedLanguage = language;
    this.currentLanguageCode = language.code;
    this.changeLanguage(this.currentLanguageCode);
  }

  onRefreshEvent(newEvent: boolean): void {
   if(newEvent)
   {
     this.eventColor = '#27A143';
     this.eventTitle = 'Modal opened'
   }
    else {
      this.eventColor = 'gray';
      this.eventTitle = 'Modal closed';
   }
  }

  public changeLanguage(code: string) {
    this.currentLanguageCode = code;
    this.translate.use(code).subscribe(
      value => {
        // value is our translated string
        //console.log(value);
      });
  }
}
