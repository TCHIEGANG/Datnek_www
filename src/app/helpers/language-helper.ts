import {InfoLanguageType} from "../models/language/infoLanguageType";


export class LanguageHelper {

  static languageTypes: InfoLanguageType[] = [
    {id: 0, selected: false, idServer: '',  position : 1, title : 'Anglais', code : 'en', color: '#16162D'},
    {id: 0, selected: false, idServer: '',  position : 2, title : 'Français', code : 'fr', color: '#16162D'},
    {id: 0, selected: false, idServer: '',  position : 3, title : 'Néerlandais', code : 'nl', color: '#16162D'}/*,
    {id: 0, selected: false, idServer: '',  position : 4, title : 'Allemand', code : 'al', color: '#16162D'},
    {id: 0, selected: false, idServer: '',  position : 5, title : 'Latin', code : 'la', color: '#16162D'},
    {id: 0, selected: false, idServer: '',  position : 6, title : 'Arabe', code : 'ar', color: '#16162D'},
    {id: 0, selected: false, idServer: '',  position : 7, title : 'Chinois', code : 'ch', color: '#16162D'}*/
  ];


  static getLanguageTypeByPosition(position: string): any{
    let selectedLanguageType;
    LanguageHelper.languageTypes.forEach(elt => {
      if (elt.position.toString(10) === position){
        selectedLanguageType = elt;
      }
    });
    return selectedLanguageType ? selectedLanguageType :LanguageHelper.languageTypes[0];
  }

}
