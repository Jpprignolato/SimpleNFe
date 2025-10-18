import { Component } from '@angular/core';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InitialPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simplenfe';
}
