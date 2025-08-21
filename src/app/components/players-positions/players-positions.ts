import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { NameAvatarComponent } from '../name-avatar/name-avatar';
import { CommonModule } from '@angular/common';
import { Card } from '../card/card';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-players-positions',
  imports: [NameAvatarComponent, CommonModule, Card],
  templateUrl: './players-positions.html',
  styleUrl: './players-positions.css',
})
export class PlayersPositions {
  data: any;
  data$: Observable<DataState>;
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

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      if (res.participants.length !== this.userList.length) {
        this.userList = [...res.participants];
      }
    });
  }
}
