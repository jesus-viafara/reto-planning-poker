import { Component, inject, Input } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { setParticipants, setRoom } from '../../state/actions/data.actions';

@Component({
  selector: 'app-vote-mode-change',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './vote-mode-change.html',
  styleUrl: './vote-mode-change.css',
})
export class VoteModeChange {
  data: any;
  data$: Observable<DataState>;
  readonly store: Store;
  @Input() onChange: boolean = false;
  room: Room = { id: '', name: '', state: 'hidden', adminName: '', cardSet: [], voteMode: ' ' };
  isSelected: boolean = false;
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    voteMode: this.fb.control(''),
  });

  constructor(store: Store<AppState>) {
    this.store = store;
    this.data$ = store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.room = { ...res.room };
    });
    this.form.setValue({ voteMode: this.room.voteMode });
  }

  changeVoteMode() {
    let participants: User[] = [];
    this.data$.subscribe((res: any) => {
      this.room = { ...res.room };
      participants = res.participants.map((p: User) => {
        return { ...p, vote: '?' };
      });
    });

    this.room.voteMode = this.form.getRawValue().voteMode;

    this.store.dispatch(setRoom({ payload: this.room }));
    this.store.dispatch(setParticipants({ payload: participants }));
    this.onChange = false;
  }
}
