import { Component, inject, Input, Output } from '@angular/core';
import { Room } from '../../models/room.model';
import { NameAvatarComponent } from '../name-avatar/name-avatar';
import { ModalInviteLink } from '../modal-invite-link/modal-invite-link';
import { Observable } from 'rxjs';
import { DataState } from '../../models/dataState';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { setParticipants, setUser } from '../../state/actions/data.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NameAvatarComponent, ModalInviteLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  data$: Observable<DataState>;
  readonly store: Store<AppState>;
  @Input() adminName: string = '';
  @Output() adminname: string = '';
  room: Room = { id: '', adminName: '', name: '', state: 'hidden', cardSet: [], voteMode: '' };
  user: User = { id: '', name: '', rol: '', modo: '', vote: '?' };
  participants: User[] = [];
  avatarSize: string = 'small';
  isInviteOpen = false;
  isChangeModo = false;
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    modo: this.fb.control(''),
  });

  constructor(store: Store<AppState>) {
    this.store = store;
    this.data$ = this.store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.room = res.room;
    });
  }

  onChangeModo() {
    this.isChangeModo = !this.isChangeModo;
  }

  changeModo() {
    this.data$.subscribe((res: any) => {
      this.user = { ...res.user };
      this.participants = [...res.participants];
    });

    if (this.form.getRawValue().modo === 'espectador') {
      this.user.vote = '?';
    }
    this.user.modo = this.form.getRawValue().modo;

    let newParticipants = [];
    newParticipants = this.participants.filter(({ id }) => id !== this.user.id);

    this.store.dispatch(setUser({ payload: { ...this.user } }));
    this.store.dispatch(setParticipants({ payload: [...newParticipants, this.user] }));

    this.isChangeModo = false;
  }
}
