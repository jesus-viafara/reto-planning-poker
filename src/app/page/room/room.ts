import { Component } from '@angular/core';
import { Room } from '../../models/room.model';
import { ModalCrearUsuarioComponent } from '../../components/modal-crear-usuario/modal-crear-usuario';
import { userList1, userList2, userList3 } from '../../data';
import { PokerTable } from '../../components/poker-table/poker-table';
import { PlayersPositions } from '../../components/players-positions/players-positions';
import { CardList } from '../../components/card-list/card-list';
import { HeaderComponent } from '../../components/header/header';
import { Observable } from 'rxjs';
import { DataState } from '../../models/dataState';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { setParticipants, setResult, setRoom, setUser } from '../../state/actions/data.actions';
import { Results } from '../../components/results/results';
import { Result } from '../../models/result.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    ModalCrearUsuarioComponent,
    PokerTable,
    PlayersPositions,
    CardList,
    HeaderComponent,
    Results,
  ],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class RoomComponent {
  readonly store: Store;
  data: any;
  data$: Observable<DataState>;
  room: Room = { id: '', name: '', state: '', adminName: '', cardSet: [], voteMode: '' };
  adminName: string = 'default';
  user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  result: Result = { totalVotes: 0, average: 0, voteCount: {} };
  participants: User[] = [];
  userList1: User[] = userList1;
  userList2: User[] = userList2;
  userList3: User[] = userList3;
  isChildOpen = false;

  constructor(store: Store<AppState>) {
    this.store = store;
    this.data$ = store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.data = res;
    });

    if (!this.data?.room.id) {
      this.data = JSON.parse(localStorage.getItem('data') || '{}');
      this.room = { ...this.data.room };
      this.user = { ...this.data.user };
      this.participants = this.data.participants;
      this.result = { ...this.data.result };
      this.store.dispatch(
        setRoom({
          payload: { ...this.data.room },
        })
      );
      this.store.dispatch(
        setUser({
          payload: { ...this.user },
        })
      );
      this.store.dispatch(
        setParticipants({
          payload: this.participants,
        })
      );
      this.store.dispatch(
        setResult({
          payload: this.result,
        })
      );
    } else {
      this.room = { ...this.data.room };
      this.user = { ...this.data.user };
    }

    if (!this.user.id) {
      this.isChildOpen = true;
    }
  }
}
