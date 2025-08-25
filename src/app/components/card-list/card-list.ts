import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { setUser, setParticipants, setRoom } from '../../state/actions/data.actions';
import { User } from '../../models/user.model';
import { Result } from '../../models/result.model';
import { Room } from '../../models/room.model';
import { escalaDuplicacion, serieFibonacci, seriePersonalizada } from '../../data';
import { VoteModeChange } from '../vote-mode-change/vote-mode-change';

@Component({
  selector: 'app-card-list',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, VoteModeChange],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css',
})
export class CardList {
  data: any;
  data$: Observable<DataState>;
  readonly store: Store;
  user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  room: Room = { id: '', name: '', state: 'hidden', adminName: '', cardSet: [], voteMode: ' ' };
  userList: User[] = [];
  result: Result = { totalVotes: 0, average: 0, voteCount: { '0': 0 } };
  selectedOption: string = '?';
  votes: string[] = [];
  isSelected: boolean = false;
  changeVoteMode: boolean = false;
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    vote: this.fb.control('?'),
  });

  constructor(store: Store<AppState>) {
    this.store = store;
    this.data$ = store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.user = res.user;
      this.room = { ...res.room };
      this.result = { ...res.result };
      if (res.room.voteMode === 'fibonacci') {
        this.votes = serieFibonacci(10);
      } else if (res.room.voteMode === 'escala-cuadratica') {
        this.votes = escalaDuplicacion(10);
      } else {
        this.votes = seriePersonalizada(10);
      }
    });

    this.room.cardSet = [...this.votes];
    this.store.dispatch(setRoom({ payload: { ...this.room } }));
    if (this.user.vote) {
      this.form.setValue({ vote: this.user.vote || '' });
    } else {
      this.form.setValue({ vote: this.votes[0] || '' });
    }
  }

  onChangeVoteMode() {
    this.changeVoteMode = true;
    setTimeout(() => {
      this.changeVoteMode = false;
    }, 2900);
  }

  onRadioChange(event: any) {
    // Access the selected value through event.target.value or this.selectedOption
    this.data$.subscribe((res: any) => {
      this.user = res.user;
      this.userList = [...res.participants];
    });
    this.store.dispatch(
      setUser({
        payload: { ...this.user, vote: this.form.getRawValue().vote },
      })
    );
    const foundUserIndex = this.userList.findIndex((user: User) => this.user.id === user.id);

    this.userList[foundUserIndex] = {
      ...this.user,
      vote: this.form.getRawValue().vote + '',
    };
    this.store.dispatch(
      setParticipants({
        payload: this.userList,
      })
    );

    this.selectedOption = this.form.getRawValue().vote;
  }
}
