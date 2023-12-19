import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EnvirmentService {

  constructor(private http: HttpClient) { }

  enviorment() {
    return this.http.get<any>('assets/enviroment.json')
      .toPromise()
      .then(res => res.data)
      .then(data => { return data; });
  }
}
