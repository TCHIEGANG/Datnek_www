import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from "../../models/language/language";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {LanguageHelper} from "../../helpers/language-helper";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {MobileService} from "../../services/mobile/mobile.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css']
})
export class LanguagesListComponent implements OnInit {

  loading: boolean;
  //languages: InfoLanguageType[] = LanguageHelper.languageTypes;
  @Input() languages: Language[];
  roles: string[] = [];
  selectedRole: string;
  nameSearch: string;
  emailSearch: string;
  closeModal: string;
  currentLanguage: Language = {} as Language;
  @Output() refreshEvent = new EventEmitter<boolean>();
  @Input() currentLanguageCode: string;
  public screenWidth: number = window.innerWidth;

  constructor(private modalService: NgbModal, public translate: TranslateService,
              private mobileService: MobileService,
              private languageService: LanguageService) { }

  ngOnInit(): void {


    this.translate.use(this.currentLanguageCode).subscribe(
      value => {
        // value is our translated string
        //console.log(value);
      });
  }





  onClickUpdate(language: Language): void {
    this.languageService.updateLanguage(language).subscribe(response => {
      this.loading = false;
    }, (error) => {
      //this.alert = {display: true, class: 'danger', title: 'Erreur ', message: '  Données incorrectes'};
      this.loading = false;
    });
  }

  onClickDelete(id: string): void {
    this.languageService.deleteLanguage(id).subscribe(response => {
      this.loading = false;
    }, (error) => {
      //this.alert = {display: true, class: 'danger', title: 'Erreur ', message: '  Données incorrectes'};
      this.loading = false;
    });
  }
  isMobile(): boolean {
    return this.mobileService.isMobile(this.screenWidth);
  }

  onClickDetail(content: any, language: any): void {
    this.refreshEvent.emit(true);
    this.currentLanguage = language;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.refreshEvent.emit(false);
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
