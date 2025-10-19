// src/app/shared/shared-imports.ts

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// NG-Zorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';

export const SHARED_IMPORTS = [
  HttpClientModule,
  NzMessageModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  RouterOutlet,
  NzButtonModule,
  NzCardModule,
  NzInputModule,
  NzIconModule,
  NzMenuModule,
  NzLayoutModule,
  NzTableModule,
  NzFormModule,
  NzModalModule,
  NzNotificationModule,
  NzSelectModule,
  NzCheckboxModule,
];
