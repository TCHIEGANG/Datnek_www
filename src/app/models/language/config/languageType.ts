import {BaseModel} from "../../baseModel";

export class LanguageType extends BaseModel{
  constructor(){
    super();
  }
  locale: string;
  key: string;
  content: string;

}
