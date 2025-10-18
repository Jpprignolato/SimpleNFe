// src/app/icons-provider.ts
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  FormOutline,
  SettingOutline,
  FileTextOutline,
  PlusOutline,
  DeleteOutline,
  EditOutline,
  SearchOutline,
  SaveOutline
} from '@ant-design/icons-angular/icons';

export const icons = [
  DashboardOutline,
  FormOutline,
  SettingOutline,
  FileTextOutline,
  PlusOutline,
  DeleteOutline,
  EditOutline,
  SearchOutline,
  SaveOutline
];

// Exporta o módulo de ícones já configurado
export const NzIconsProviderModule = NzIconModule.forRoot(icons);
