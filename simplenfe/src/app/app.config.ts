import { importProvidersFrom, ApplicationConfig } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNzI18n, pt_BR } from 'ng-zorro-antd/i18n';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNzI18n(pt_BR),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),


    // Import global modules NG-Zorro + FormsModule
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      NzCardModule,
      NzTabsModule,
      NzListModule,
      NzTagModule,
      NzButtonModule,
      NzInputModule,
      NzDatePickerModule,
      NzMenuModule,
      NzSpaceModule,
      NzIconModule
    )
  ]
};
