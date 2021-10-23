import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Language} from "../models/language/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  url = '/languages';
  headers = new HttpHeaders();
  httpHeaders = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = { headers: this.httpHeaders };
  }

  /**
   * find languages infos
   */
  findLanguageInfos(locale: string): Observable<any> {
    return this.httpClient.get<any>(environment.ms_datnek_host + this.url + '/language/' + locale , this.httpOptions);
  }

  /**
   * find all languages
   */
  findLanguages(): Observable<any> {
    return this.httpClient.get<any>(environment.ms_datnek_host + this.url + '/all/' , this.httpOptions);
  }

  /**
   * create an language
   */
  createLanguage(language: Language): Observable<any>{
    return this.httpClient.post<any>(environment.ms_datnek_host + this.url, language);
  }

  /**
   * find language by idServer
   */
  findLanguageById(id: string): Observable<any>{
    return this.httpClient.get<any>(environment.ms_datnek_host + this.url + '/' + id, this.httpOptions);
  }


  /**
   * update language
   */
  updateLanguage(language: Language): Observable<any>{
    return this.httpClient.put(environment.ms_datnek_host + this.url, language, this.httpOptions);
  }


  /**
   * delete language
   */
  deleteLanguage(id: string): Observable<any>{
    return this.httpClient.delete(environment.ms_datnek_host + this.url+ '/' + id, this.httpOptions);
  }

}
