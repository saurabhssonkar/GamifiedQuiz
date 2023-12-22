import {Injectable} from '@angular/core';
// import { IAppConfig } from './app-config.model';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environment';




@Injectable()

export class AppConfig {

    // static settings:IAppConfig;
        static settings:any;
    

    constructor( private http:HttpClient){}

    load()
    {
        const jsonFile = `assets/enviroment.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response) => {
               AppConfig.settings = <any>response;
               console.log("AppConfig.setting",AppConfig.settings)
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}