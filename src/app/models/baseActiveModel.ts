import {BaseModel} from './baseModel';


export class BaseActiveModel extends BaseModel{
    active: boolean;
    deleted: boolean;
    createdAt: Date;
    modifiedAt: Date;
    revision: number;
}
