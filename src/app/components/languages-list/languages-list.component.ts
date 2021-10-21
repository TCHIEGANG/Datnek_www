import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from "../../models/language/language";
import {InfoLanguageType} from "../../models/language/infoLanguageType";
import {LanguageHelper} from "../../helpers/language-helper";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css']
})
export class LanguagesListComponent implements OnInit {

  loading: boolean;
  languages: InfoLanguageType[] = LanguageHelper.languageTypes;
  allLanguages: Language[] = [];
  roles: string[] = [];
  selectedRole: string;
  nameSearch: string;
  emailSearch: string;
  closeModal: string;
  currentLanguage: InfoLanguageType = {} as InfoLanguageType;
  @Output() refreshEvent = new EventEmitter<boolean>();
  @Input() currentLanguageCode: string;

  constructor(private modalService: NgbModal, public translate: TranslateService) { }

  ngOnInit(): void {
    this.initRoles();
    this.translate.use(this.currentLanguageCode).subscribe(
      value => {
        // value is our translated string
        //console.log(value);
      });
  }

  initRoles(): void {
    this.roles.push('Admin');
    this.roles.push('Utilisateur');
  }

  /*public name(account: Account): string{
    return StringHelper.truncateName(account, 20);
  }

  role(account: Account): string{
    return account && account.role && account.role === 'USER' ? 'Utilisateur' : 'Admin';
  }*/

  onChangeRole(role: string): void {
    // console.log(role);
    // this.accounts = [];
    // this.allAccounts.forEach((elt, index) => {
    //   if (elt.role.toLowerCase().includes(role.toLowerCase())){
    //     this.accounts.push(elt);
    //   }
    // });
    //
    // console.log(this.accounts);
  }

  onKeyupSearchAccountName(): void {
    /*this.accounts = [];
    this.allAccounts.forEach((elt, index) => {
      if (elt.firstname.toLowerCase().includes(this.nameSearch.toLowerCase()) ||
        elt.lastname.toLowerCase().includes(this.nameSearch.toLowerCase())){
        this.accounts.push(elt);
      }
    });*/
  }

  onKeyupSearchAccountEmail(): void {
    /*this.accounts = [];
    this.allAccounts.forEach((elt, index) => {
      if (elt.email.toLowerCase().includes(this.emailSearch.toLowerCase())){
        this.accounts.push(elt);
      }
    });*/
  }

  onClickUpdate(): void {

  }

  onClickDelete(): void {

  }


  onClickDetail(content: any, language: any): void {
    this.refreshEvent.emit(true);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.currentLanguage = language;
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
