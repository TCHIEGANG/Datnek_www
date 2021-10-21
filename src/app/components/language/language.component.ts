import {Component, Input, OnInit} from '@angular/core';
import {Alert} from "../../models/alert";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {LanguageHelper} from "../../helpers/language-helper";
import {CommonHelper} from "../../helpers/common-helper";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  errors;
  submitted = false;
  alert: Alert = {} as Alert;
  //@Input() certificate: Certification = {} as Certification;
  @Input() selectedLanguage: InfoLanguageType;
  levels: any[] = CommonHelper.levels;
  languageLevel : string;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.initErrors();
  }
  initErrors(): void{
    this.submitted = false;
    this.errors = {valid: true, selectedLanguage: '', spokenLevel: '', writtenLevel: '', comprehensionLevel: ''};
    this.alert = {} as Alert;
  }

  onChangeSelectedLanguage(e): void {
    this.errors.establishmentCertificationType = '';
    /*this.accountAcademics.establishmentCertificationTypes.forEach(elt => {
      if (elt.label.toLowerCase() === e.target.value.toLowerCase()){
        this.certificate.establishmentCertificationType = elt;
      }
    });*/
  }

  onClickRegister(): void {

  }
}
