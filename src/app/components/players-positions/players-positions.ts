import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { NameAvatarComponent } from '../name-avatar/name-avatar';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { Room } from '../../models/room.model';
import { setParticipants, setRoom, setUser } from '../../state/actions/data.actions';

@Component({
  selector: 'app-players-positions',
  imports: [NameAvatarComponent, CommonModule, Card],
  templateUrl: './players-positions.html',
  styleUrl: './players-positions.css',
})
export class PlayersPositions {
  data: any;
  data$: Observable<DataState>;
  readonly store: Store<AppState>;
  newAdminMenu: boolean = false;
  menuPosition: string = '';
  userPicked: User = { id: '', name: '', rol: '', modo: '', vote: '?' };
  userLogged: User = { id: '', name: '', rol: '', modo: '', vote: '?' };
  room: Room = { id: '', adminName: '', name: '', state: 'hidden', cardSet: [] };
  @Input() userList: User[] = [];
  playerPosition: string[] = [
    'bottom-center',
    'top-left',
    'top-center',
    'top-right',
    'left',
    'right',
    'bottom-left',
    'bottom-right',
  ];

  constructor(store: Store<AppState>) {
    this.store = store;
    this.data$ = this.store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.userList = res.participants;
      this.userLogged = { ...res.user };
    });
  }

  giveAdminAccess() {
    this.data$.subscribe((res: any) => {
      this.room = { ...res.room };
    });

    this.room.adminName = this.userPicked.name;
    this.userPicked.rol = 'admin';
    let newParticipants = [];
    newParticipants = this.userList.filter(
      ({ id }) => id !== this.userPicked.id && id !== this.userLogged.id
    );

    this.store.dispatch(setRoom({ payload: { ...this.room } }));
    this.store.dispatch(setUser({ payload: { ...this.userLogged, rol: 'player' } }));
    this.store.dispatch(
      setParticipants({ payload: [...newParticipants, this.userPicked, this.userLogged] })
    );

    this.newAdminMenu = false;
  }

  giveAdminMenu(user: User, position: string) {
    if (this.newAdminMenu || user.rol === 'admin') {
      this.newAdminMenu = false;
      return;
    }
    this.newAdminMenu = true;
    this.menuPosition = position;
    this.userPicked = { ...user };
    setTimeout(() => {
      this.newAdminMenu = false;
    }, 3100);
  }
}
