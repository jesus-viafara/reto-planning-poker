import { Component, inject } from '@angular/core';
import { Room } from '../../models/room.model';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  forbiddenNameValidator,
  maxNumbersValidator,
  soloNumerosValidator,
} from '../../validations/name.validations';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/selectors/data.selectors';
import { setRoom } from '../../state/actions/data.actions';

@Component({
  selector: 'app-crear-partida',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-partida.html',
  styleUrl: './crear-partida.css',
})
export class CrearPartidaComponent {
  room: Room = {
    id: '',
    name: '',
    state: 'hidden',
    adminName: '',
    cardSet: [],
    voteMode: 'fibonacci',
  };
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    roomName: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        forbiddenNameValidator(/[_.,*#/-]/),
        maxNumbersValidator(3),
        soloNumerosValidator(),
      ],
    }),
  });

  constructor(private router: Router, private store: Store<AppState>) {}

  createRoom() {
    this.room.id = uuid.v4();
    this.room.name = this.form.getRawValue().roomName;
    this.store.dispatch(setRoom({ payload: this.room }));
    this.router.navigate(['/room/' + this.room.id]);
  }
}
