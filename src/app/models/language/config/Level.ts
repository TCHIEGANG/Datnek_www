import {BaseModel} from "../../baseModel";

export class Level extends BaseModel{
  constructor(){
    super();
  }
  locale: string;
  key: string;
  content: string;

}
