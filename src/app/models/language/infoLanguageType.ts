import {BaseModel} from '../baseModel';

export class InfoLanguageType extends BaseModel{
    constructor(){
        super();
    }

  title: string;
  position: number;
  selected: boolean;
  code: string;
  color: string;
}
