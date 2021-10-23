import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Alert} from "../../models/alert";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {LanguageHelper} from "../../helpers/language-helper";
import {CommonHelper} from "../../helpers/common-helper";
import {TranslateService} from "@ngx-translate/core";
import {Language} from "../../models/language/language";
import { LanguageService } from 'src/app/services/language.service';
import {MobileService} from "../../services/mobile/mobile.service";
import {Account} from "../../models/account/account";
import {Level} from "../../models/language/config/Level";
import {LanguageType} from "../../models/language/config/languageType";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  errors;
  loading: boolean;
  submitted = false;
  alert: Alert = {} as Alert;
  @Input() selectedLanguage: InfoLanguageType;
  @Input() languages: Language[] = [];
  @Output() newLanguageEvent = new EventEmitter<Language>();
  @Input() levels: Level[];
  @Input() languageTypes: LanguageType[];
  languageToUpdate: Language;
  public screenWidth: number = window.innerWidth;

  @Input() myLanguage: Language ;
  languageType: LanguageType = {} as LanguageType;
  account: Account  = {} as Account;

  constructor(public translate: TranslateService,
              private languageService: LanguageService,
              private mobileService: MobileService) { }

  ngOnInit(): void {
    this.initErrors();

  }
  initErrors(): void{
    this.submitted = false;
    this.errors = {valid: true, languageType: '', spokenLevel: '', writtenLevel: '', comprehensionLevel: ''};
    this.alert = {} as Alert;
  }

  onChangeLanguageType(e): void {
    this.errors.languageType = '';
    this.languageTypes.forEach(elt => {
      if (elt.content.toLowerCase() === e.target.value.toLowerCase()) {
        this.myLanguage.languageType = elt;
      }
    });
  }


  onChangeSpokenLevel(e): void {
    this.errors.spokenLevel = '';
    this.levels.forEach(elt => {
      if (elt.content.toLowerCase() === e.target.value.toLowerCase()) {
        this.myLanguage.spokenLevel = elt;
      }
    });
  }

  onChangeWrittenLevel(e): void {
    this.errors.writtenLevel = '';
    this.levels.forEach(elt => {
      if (elt.content.toLowerCase() === e.target.value.toLowerCase()) {
        this.myLanguage.writtenLevel = elt;
      }
    });
  }

  onChangeComprehensionLevel(e): void {
    this.errors.comprehensionLevel = '';
    this.levels.forEach(elt => {
      if (elt.content.toLowerCase() === e.target.value.toLowerCase()) {
        this.myLanguage.comprehensionLevel = elt;
      }
    });
  }

  onClickRegister(): void {
    //this.myLanguage.account = this.account;
    if (this.validateLanguageInfos()) {
      this.loading = true;
      this.languageService.createLanguage(this.myLanguage).subscribe(response => {
        this.newLanguageEvent.emit(response.resource);
        this.myLanguage = {} as Language;
        this.loading = false;
      }, (error) => {
        this.alert = {display: true, class: 'danger', title: 'Erreur ', message: '  Données incorrectes'};
        this.loading = false;
      });
    }
  }

  validateLanguageInfos(): boolean{
    this.initErrors();

    if (!this.myLanguage.spokenLevel ){
      this.errors.valid = false;
      this.errors.spokenLevel = "requis";
    }

    if (!this.myLanguage.writtenLevel ){
      this.errors.valid = false;
      this.errors.writtenLevel = "requis";
    }

    if (!this.myLanguage.comprehensionLevel ){
      this.errors.valid = false;
      this.errors.comprehensionLevel = "requis";
    }

    if (!this.myLanguage.languageType ){
      this.errors.valid = false;
      this.errors.languageType = "requis";
    }

    this.submitted = true;
    return this.errors.valid;
  }

  isMobile(): boolean {
    return this.mobileService.isMobile(this.screenWidth);
  }

}
