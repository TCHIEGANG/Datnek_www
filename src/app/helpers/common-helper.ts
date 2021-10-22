import {Level} from "../enum/level.enum";
import {LanguageType} from "../enum/languageType.enum";
import {TranslateService} from "@ngx-translate/core";


export class CommonHelper {

  constructor(public translate: TranslateService) { }

  static levels: any[] = [
    {code: Level[Level.Elémentaire], label : 'Elémentaire'},
    {code: Level[Level.Pré_intermédiaire], label : 'Pré-intermédiare'},
    {code: Level[Level.Intermédiaire], label : 'Intermédiaire'},
    {code: Level[Level.Courant], label : 'Courant'}
  ];

  static languageTypes: any[] = [
    {code: LanguageType[LanguageType.Anglais], label : 'Anglais'},
    {code: LanguageType[LanguageType.Français], label : 'Français'},
    {code: LanguageType[LanguageType.Néerlandais], label : 'Néerlandais'}
  ];
}
