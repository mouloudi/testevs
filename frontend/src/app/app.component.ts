import { Component } from '@angular/core';

import { ExamensComponent } from './exams/examens.component';


@Component({
  selector: 'app-root',
  imports: [ExamensComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
