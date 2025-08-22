import { Component } from '@angular/core';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  data$: Observable<DataState>;
  user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  result: Result = { totalVotes: 0, average: 0, voteCount: {} };
  room: Room = { id: '', name: '', state: 'hidden', adminName: '', cardSet: [] };
  count: string[] = [];

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.user = res.user;
      this.room = res.room;
      this.result = { ...res.result };
      this.count = Object.keys(res.result.voteCount);
    });
  }
}
