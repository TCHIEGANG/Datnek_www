import {BaseActiveModel} from "../baseActiveModel";
import {Level} from "./config/Level";
import {LanguageType} from "./config/languageType";

export class Language extends BaseActiveModel{
  constructor(){
    super();
  }
  spokenLevel: Level;
  writtenLevel: Level;
  comprehensionLevel: Level;
  languageType: LanguageType;
  /*account: Account;*/
}
