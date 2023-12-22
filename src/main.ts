import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angular/localize/init';
// import * as math from 'mathjs';
// import 'mathjax';

// MathJax.Hub.Config({
//   tex2jax: { inlineMath: [['$', '$']] }
// });




import { AppModule } from './app/app.module';
import { AppConfig } from './app.config';

// platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  
  
//   // Ensure Angular destroys itself on hot reloads.
//   if (window['ngRef']) {
//     window['ngRef'].destroy();
//   }
//   window['ngRef'] = ref;

//   // Otherwise, log the boot error
// }).catch(err => console.error(err));


AppConfig.load()
.then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  
  
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
  
    // Otherwise, log the boot error
  }).catch(err => console.error(err));
  
});


// platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  
  
//   // Ensure Angular destroys itself on hot reloads.
//   if (window['ngRef']) {
//     window['ngRef'].destroy();
//   }
//   window['ngRef'] = ref;

//   // Otherwise, log the boot error
// }).catch(err => console.error(err));


