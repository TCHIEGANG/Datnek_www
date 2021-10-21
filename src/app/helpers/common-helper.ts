import {Level} from "../enum/level.enum";


export class CommonHelper {

  static levels: any[] = [
    {code: Level[Level.ELEMENTAIRE], label : 'Elémentaire'},
    {code: Level[Level.PRE_INTERMEDIARE], label : 'Pré-intermédiare'},
    {code: Level[Level.INTERMEDIARE], label : 'Intermédiaire'},
    {code: Level[Level.COURANT], label : 'Courant'}
  ];
}
