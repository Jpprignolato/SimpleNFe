import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

// Import components Filhos


@Component({
  selector: 'app-initial-page',
  standalone: true,
  imports: [CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzButtonModule,
    NzGridModule,
    NzAvatarModule,
    NzDropDownModule,
    NzSwitchModule,
    NzDividerModule,
    FormsModule, RouterModule],
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InitialPageComponent implements AfterViewInit {
    isCollapsed = false;
    username: string | null = null;

    constructor(private router: Router, private storage: StorageService) {}

  // Abaixo o método de logout
 ngOnInit(): void {
  this.username = this.storage.getItem('username');
  const token = this.storage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Usuário logado ID:', payload.sub);
  }
}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

    // Onde os componentes serão injetados dinamicamente
    @ViewChild('contentContainer', { read: ViewContainerRef})
    contentContainer!: ViewContainerRef;

    @ViewChild('welcomeTpl', {read: TemplateRef})
    welcomeTpl!: TemplateRef<any>

    private currentComponentRef: any = null;

    /**
   * Método responsável por carregar o componente dinâmico.
   * Usa import() dinâmico, que carrega o componente sob demanda (lazy).
   */
    async openComponent(component: string) {
      this.contentContainer.clear(); // Limpa o conteúdo anterior
      this.currentComponentRef = null;

      switch (component) {
        case 'nfe':
          const { NfeComponent } = await import('../nfe/nfe.component');
          const compRef = this.contentContainer.createComponent(NfeComponent)
          this.currentComponentRef = compRef;

          // Injeta a função voltar no component criado dinamicamente
          compRef.instance.voltar = () => this.voltarInicio();
          break;
         
        default:
          this.voltarInicio();
          break;
      }
    }

    //Método para voltar ao início
   voltarInicio() {
  if (this.currentComponentRef) {
    try { this.currentComponentRef.destroy(); } catch(e) {}
    this.currentComponentRef = null;
  }

  this.contentContainer.clear();

  if (this.welcomeTpl) {
    this.contentContainer.createEmbeddedView(this.welcomeTpl);
  }
}

  // 🔹 Aqui: Angular garante que ViewChild já está inicializado
  ngAfterViewInit() {
    this.voltarInicio();
  }

   
}
