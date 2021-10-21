import {BaseModel} from "../baseModel";

export class Language extends BaseModel{
  constructor(){
    super();
  }
  spokenLevel: string;
  writtenLevel: string;
  comprehensionLevel: string;
}
