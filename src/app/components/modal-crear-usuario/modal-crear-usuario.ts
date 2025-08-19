import { Component, EventEmitter, inject, Output } from '@angular/core';
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
import { User, userList2 } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import * as uuid from 'uuid';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-modal-crear-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-crear-usuario.html',
  styleUrl: './modal-crear-usuario.css',
})
export class ModalCrearUsuarioComponent {
  @Output() close = new EventEmitter(); // or // close = output();
  user: User = { id: '', name: '', rol: '', modo: '', vote: '?' };
  room: Room = { id: '', name: '', usersId: [], adminName: '' };
  userList: User[] = [];
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    userName: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        forbiddenNameValidator(/[_.,*#/-]/),
        maxNumbersValidator(3),
        soloNumerosValidator(),
      ],
    }),
    modo: this.fb.control(''),
  });

  createUser() {
    this.room = JSON.parse(localStorage.getItem('room') || '{}');
    this.userList = userList2;
    this.user.id = uuid.v4();
    this.user.name = this.form.getRawValue().userName;
    this.user.modo = this.form.getRawValue().modo;
    if (!this.room.adminName) {
      this.room.adminName = this.user.name;
      localStorage.setItem('room', JSON.stringify(this.room));
      this.user.rol = 'admin';
    } else {
      this.user.rol = 'player';
    }
    this.userList.push(this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('userList', JSON.stringify(this.userList));

    this.close.emit(true);
  }
}
