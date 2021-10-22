import {Component, NgModule, OnInit} from '@angular/core';
import {LanguageHelper} from "../../helpers/language-helper";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {TranslateService} from "@ngx-translate/core";
import {MobileService} from "../../services/mobile/mobile.service";
import {LanguageService} from "../../services/language.service";
import {Language} from "../../models/language/language";
import {LanguageInfos} from "../../models/language/config/languageInfos";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  languages: InfoLanguageType[] = LanguageHelper.languageTypes;
  currentLanguageCode: string;
  selectedLanguage: InfoLanguageType;
  eventColor: string;
  eventTitle: string;
  public screenWidth: number = window.innerWidth;
  languageList: Language[] = [];
  languageInfos: LanguageInfos  = {} as LanguageInfos;

  constructor(public translate: TranslateService,
              private languageService: LanguageService,
              private mobileService: MobileService)
  {

  }

  ngOnInit(): void {
    this.eventTitle = 'Modal closed';
    this.eventColor = 'gray';
    this.findLanguagesInfos('fr');
    this.selectedLanguage = LanguageHelper.languageTypes[1];
    this.currentLanguageCode = this.selectedLanguage.code;
  }
  isMobile(): boolean {
    return this.mobileService.isMobile(this.screenWidth);
  }

  findLanguagesInfos(locale: string): void {
    this.loading = true;
    this.languageService.findLanguageInfos(locale).subscribe(response => {
      this.languageInfos = response.resource;
      this.loading = false;
    }, (error) => {
      //this.alert = {display: true, class: 'danger', title: 'Erreur ', message: '  Données incorrectes'};
      this.loading = false;
    });

  }

  onClickTab(language: InfoLanguageType): void {
    this.findLanguagesInfos(language.code);
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

  onNewLanguageEvent(language: Language): void {
    this.languageList.push(language);
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
