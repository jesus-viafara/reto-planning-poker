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
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import * as uuid from 'uuid';
import { Room } from '../../models/room.model';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { setParticipants, setRoom, setUser } from '../../state/actions/data.actions';
import { userList2 } from '../../data';

@Component({
  selector: 'app-modal-crear-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-crear-usuario.html',
  styleUrl: './modal-crear-usuario.css',
})
export class ModalCrearUsuarioComponent {
  data: any;
  data$: Observable<DataState>;
  readonly store: Store;
  @Output() close = new EventEmitter(); // or // close = output();
  user: User = { id: '', name: '', rol: '', modo: '', vote: '?' };
  room: Room = { id: '', name: '', state: 'hidden', adminName: '', cardSet: [], voteMode: ' ' };
  userList: User[] = [...userList2];
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

  constructor(store: Store<AppState>) {
    this.store = store;
    this.data$ = store.select(getData);
  }

  ngOnInit(): void {
    this.data$.subscribe((res: any) => {
      this.data = res;
    });

    if (!this.data?.room.id) {
      this.data = JSON.parse(localStorage.getItem('data') || '{}');
      this.room = { ...this.data.room };
      this.store.dispatch(
        setRoom({
          payload: { ...this.data.room },
        })
      );

      this.store.dispatch(
        setParticipants({
          payload: this.userList,
        })
      );
    }

    if (this.data.user?.id) {
      this.store.dispatch(
        setUser({
          payload: { ...this.data.user },
        })
      );
    }

    this.room = { ...this.data.room };
    this.user = { ...this.data.user };
    this.userList = [...this.userList, this.user];

    if (this.data.user?.id) {
      this.close.emit(true);
    }
  }

  createUser() {
    this.user.id = uuid.v4();
    this.user.name = this.form.getRawValue().userName;
    this.user.modo = this.form.getRawValue().modo;
    if (!this.room?.adminName) {
      this.room.adminName = this.user.name;
      this.user.rol = 'admin';
    } else {
      this.user.rol = 'player';
    }

    this.store.dispatch(
      setRoom({
        payload: { ...this.room },
      })
    );
    this.store.dispatch(
      setUser({
        payload: { ...this.user },
      })
    );
    this.store.dispatch(
      setParticipants({
        payload: [...this.userList],
      })
    );

    this.close.emit(true);
  }
}
