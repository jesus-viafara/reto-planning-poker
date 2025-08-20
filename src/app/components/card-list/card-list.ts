import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css',
})
export class CardList {
  selectedOption: string = '?';
  ramdomSerie: number[] = this.seriePersonalizada(10);
  isSelected: boolean = false;
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    vote: this.fb.control(''),
  });

  seriePersonalizada(n: number) {
    const secuencia = [];
    let valor = 1;
    for (let i = 0; i < n; i++) {
      secuencia.push(valor);
      if (i % 2 === 0) {
        valor += 3;
      } else {
        valor *= 2;
      }
    }
    return secuencia;
  }

  onRadioChange(event: any) {
    // Access the selected value through event.target.value or this.selectedOption
    console.log(this.form.getRawValue().vote);
    this.selectedOption = this.form.getRawValue().vote;
    console.log('Radio button selected:', this.selectedOption);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.vote = this.selectedOption;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
