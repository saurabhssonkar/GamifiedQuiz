import { Injectable } from '@angular/core';
// import { IAppConfig } from './app-config.model';
// import { environment } from './environments/environment';
@Injectable()
export class AppConfig {

    // static settings: IAppConfig;
    static settings: any;


    static load() {
        const jsonFile = `assets/enviroment.json`;
        return new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.overrideMimeType('application/json');
            xhr.open('GET', jsonFile, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.settings = JSON.parse(xhr.responseText);
                        console.log("this.setting",this.settings);
                        resolve();
                    } else {
                        reject(`Could not load file '${jsonFile}': ${xhr.status}`);
                    }
                }
            };
            xhr.send(null);
        });
    }
}