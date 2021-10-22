import {BaseModel} from "../../baseModel";
import {LanguageType} from "./languageType";
import {Level} from "./Level";

export class LanguageInfos extends BaseModel{
  constructor(){
    super();
  }

  languageTypes: LanguageType[];
  levels: Level[];

}
