import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from "../../models/language/language";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {LanguageHelper} from "../../helpers/language-helper";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {MobileService} from "../../services/mobile/mobile.service";
import {LanguageService} from "../../services/language.service";
import {Alert} from "../../models/alert";

@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css']
})
export class LanguagesListComponent implements OnInit {

  loading: boolean;
  //languages: InfoLanguageType[] = LanguageHelper.languageTypes;
  @Input() languageList: Language[];
  roles: string[] = [];
  selectedRole: string;
  nameSearch: string;
  emailSearch: string;
  closeModal: string;
  languageToDelete: Language = {} as Language;
  languageToUpdate: Language = {} as Language;
  currentLanguage: Language = {} as Language;
  @Output() refreshEvent = new EventEmitter<boolean>();
  @Output() newDeletedLanguageEvent = new EventEmitter<Language>();
  @Output() newUpdateLanguageEvent = new EventEmitter<Language>();
  @Input() currentLanguageCode: string;
  public screenWidth: number = window.innerWidth;
  alert: Alert = {} as Alert;


  constructor(private modalService: NgbModal, public translate: TranslateService,
              private mobileService: MobileService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
  }

  onClickUpdate(content: any, language: Language): void {
    this.languageToUpdate = language;
    this.openModal(content);
  }

  onClickDelete(content: any,language: Language): void {
    this.languageToDelete = language;
    //localStorage.setItem('languageToDelete', language.idServer);
    this.openModal(content);
  }
  isMobile(): boolean {
    return this.mobileService.isMobile(this.screenWidth);
  }

  openModal(content: any): void{
    this.refreshEvent.emit(true);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.refreshEvent.emit(false);
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  close(): void {
    this.modalService.dismissAll();
  }

  onClickDetail(content: any, language: any): void {
    this.currentLanguage = language;
    this.openModal(content);
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

  onClickConfirmDelete(): void {
    //const id = localStorage.getItem('languageToDelete');
    this.languageService.deleteLanguage(this.languageToDelete.idServer).subscribe(response => {
      this.loading = false;
      // @ts-ignore
      this.newDeletedLanguageEvent.emit(this.languageToDelete);
    }, (error) => {
      this.alert = {display: true, class: 'danger', title: 'Erreur ', message: '  Langue non supprimée'};
      this.loading = false;
    },() => {
      //localStorage.removeItem('languageToDelete')
      });
    this.modalService.dismissAll();
  }


  onClickConfirmUpdate(): void {
    this.newUpdateLanguageEvent.emit(this.languageToUpdate);
    this.modalService.dismissAll();
  }
}
