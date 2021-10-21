import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageComponent } from './components/language/language.component';
import {RouterModule} from "@angular/router";
import { AlertComponent } from './components/alert/alert.component';
import {AppRoutingModule} from "./app-routing.module";
import { LanguagesListComponent } from './components/languages-list/languages-list.component';
import {FormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LanguageComponent,
    AlertComponent,
    LanguagesListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      })

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
