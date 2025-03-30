import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APIService } from '../services/api.service';
import { apiEndpoints } from '../services/apiEndpoints';

import { LucideAngularModule, User, MapPin, CalendarDays, Clock4 } from 'lucide-angular';

import { Exam } from '../models/exam.model';
import { EXAM_STATUS } from '../../conf/exam-status';
import { AddExamModalComponent } from '../add-exam-modal/add-exam-modal.component';



@Component({
  selector: 'app-examens',
  imports: [LucideAngularModule, CommonModule, AddExamModalComponent],
  templateUrl: './examens.component.html',
  styleUrl: './examens.component.css'
})


export class ExamensComponent implements OnInit {
  // Icons
  readonly UserIcon = User;
  readonly MapPinIcon = MapPin;
  readonly CalendarDaysIcon = CalendarDays;
  readonly Clock4Icon = Clock4;

  // Initialisation
  isModalOpen = false;
  exams: Exam[] = [];
  examsLength = 0;

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.callBackend();
  }


  // Appel back 
  callBackend() {
    this.apiService.get<Exam[]>(apiEndpoints.EXAMS).subscribe(
      {
        next: (data) => {
          data.reverse();
          this.exams = data;
          this.examsLength = this.exams.length;
        },

        error: (error) => {
          alert(error.message); // Juste pour illustrer. A remplacer par un composant plus joli
        }
      }
    );

  }

  // Gestion de l'ouverture / fermeture modal
  openModal() {
    this.isModalOpen = true;
  }

  closeModal(mode: boolean) {
    if (mode) {
      this.callBackend();
    }
    this.isModalOpen = false;
  }


  // Methode d'aide à l'affichage
  getDayFromTimeStamp(timestamp: number): string {
    const date = new Date(timestamp);
    const jour = date.getDate();

    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    const formattedDate = date.toLocaleString('fr-FR', options);

    return jour + " " + formattedDate;
  }

  getHourFromTimeStamp(timestamp: number): number {
    const date = new Date(timestamp);
    return date.getHours();
  }

  // Traducteur de statut 
  getStatusDetails(status: string) {
    return EXAM_STATUS[status as keyof typeof EXAM_STATUS];
  }

}
