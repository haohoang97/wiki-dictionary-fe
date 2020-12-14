import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class MainServiceService {

  constructor(private http: HttpClient) { }

  async getAllWord() {
    try {
      let url = 'https://localhost:44326/api/words';
      return await this.http.get(url).toPromise();
    } catch (error) { }
  }

  async getWord(word: string) {
    try {
      let url = `https://localhost:44326/api/words/${word}`;
      return await this.http.get(url).toPromise();
    } catch (error) { }
  }

  async getWordByLanguage(languageFrom: string, languageTo: string, word: string) {
    try {
      let url = `https://localhost:44326/api/words/${languageFrom}/${languageTo}/${word}`;
      return await this.http.get(url).toPromise();
    } catch (error) { }
  }

  async getSentencesByLanguage(languageFrom: string, languageTo: string, sentences: string) : Promise<any> {
    try {
      let url = `https://localhost:44326/api/words/${languageFrom}/${languageTo}`;
      return this.http.post(url, {
        "languageFrom" : languageFrom,
        "languageTo" : languageTo,
        "textTranslate" : sentences,
      }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).toPromise();
    } catch (error) { }
  }

  async getMultiLanguage(data) : Promise<any> {
    try {
      let url = `https://localhost:44326/api/words/multiLanguage`;
      return this.http.post(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).toPromise();
    } catch (error) { }
  }

  async getMultiLanguageByLanguage(data) {
    try {
      let url = `https://localhost:44326/api/words/multiLanguageByLanguage`;
      return await this.http.post(url, data).toPromise();
    } catch (error) { }
  }

  async getMultiLanguageImg(data) : Promise<any> {
    try {
      let url = `https://localhost:44326/api/words/MultiLanguageImg`;
      return this.http.post(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).toPromise();
    } catch (error) { }
  }
}
