import { Component } from '@angular/core';
<<<<<<< HEAD
import { SHARED_IMPORTS } from '../shared/shared-imports';
=======
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
>>>>>>> origin/homologacao

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: SHARED_IMPORTS,
=======
  imports: [InitialPageComponent, RouterOutlet, CommonModule, RouterModule],
>>>>>>> origin/homologacao
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simplenfe';
}
