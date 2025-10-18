import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideNzI18n(pt_BR), 
    importProvidersFrom(FormsModule), 
    provideAnimationsAsync(), 
    provideHttpClient()]
};
