import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { APIService } from '../services/api.service';
import { EXAM_STATUS } from '../../conf/exam-status';
import { apiEndpoints } from '../services/apiEndpoints';


@Component({
  selector: 'app-add-exam-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-exam-modal.component.html',
  styleUrl: './add-exam-modal.component.css'
})

export class AddExamModalComponent {
  @Output() close = new EventEmitter<boolean>();

  constructor(private apiService: APIService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  addExamForm!: FormGroup;
  isLoading = false;

  ngOnInit(): void {
    this.addExamForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      place: [],
      time: [],
      status: []
    })
  }


  // Chargement des statuts
  examStatuses = Object.entries(EXAM_STATUS).map(([key, value]) => ({ key, value }));
  selectedStatus = this.examStatuses[0].key;


  closeModal(mode: boolean) {
    this.close.emit(mode);
  }

  onSubmit(): void {
    if (this.addExamForm.invalid) {
      return;
    }

    // Conversion de DateTime en Time 
    if (this.addExamForm.value.time) this.addExamForm.value.time = new Date(this.addExamForm.value.time).getTime();

    this.apiService.post(apiEndpoints.EXAMS, this.addExamForm.value).subscribe({
      next: () => {
        this.showToast('Examen enregistré !');
        this.addExamForm.reset();
        this.closeModal(true);

      },
      error: (error) => {
        this.showToast("Une erreur s'est produite. Veuillez réessayer.");
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading = false;
      }

    });
  }

  showToast(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }
}
