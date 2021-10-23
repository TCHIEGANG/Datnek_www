import {Component, NgModule, OnInit} from '@angular/core';
import {LanguageHelper} from "../../helpers/language-helper";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {TranslateService} from "@ngx-translate/core";
import {MobileService} from "../../services/mobile/mobile.service";
import {LanguageService} from "../../services/language.service";
import {Language} from "../../models/language/language";
import {LanguageInfos} from "../../models/language/config/languageInfos";
import {environment} from "../../../environments/environment";


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
  languageToUpdate: Language = {} as Language;


  constructor(public translate: TranslateService,
              private languageService: LanguageService,
              private mobileService: MobileService)
  {

  }

  ngOnInit(): void {
    this.eventTitle = 'Modal closed';
    this.eventColor = 'gray';

    //Initialisation avec la langue et position par défeaut
    this.findLanguagesInfos(environment.defaut_language);
    this.selectedLanguage = LanguageHelper.languageTypes[environment.defaut_position_tab_language];
    this.currentLanguageCode = this.selectedLanguage.code;
    this.findLanguages();
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

  /*
   *
   */
  findLanguages(): void {
    this.loading = true;
    this.languageService.findLanguages().subscribe(response => {
      this.languageList = response.resources;
      this.changeLanguage(environment.defaut_language); // Conversion en français
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

  onUpdateLanguageEvent(language: Language): void {
    this.languageToUpdate = language;
  }
  onDeletedLanguageEvent(language: Language): void {
    this.languageList = this.languageList.filter(lang => lang !== language);
  }

  public changeLanguage(code: string) {
    this.currentLanguageCode = code;
    this.translate.use(code).subscribe(
      value => {

        //Traduction des données issues du backend
        this.languageList.forEach((language) => {
          language.languageType.content = value[language.languageType.key];
          language.spokenLevel.content = value[language.spokenLevel.key];
          language.writtenLevel.content = value[language.writtenLevel.key];
          language.comprehensionLevel.content = value[language.comprehensionLevel.key];
        });

      });
  }
}
