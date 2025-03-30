import { Component } from '@angular/core';

import { ExamensComponent } from './examens/examens.component';


@Component({
  selector: 'app-root',
  imports: [ExamensComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
