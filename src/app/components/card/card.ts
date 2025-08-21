import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  data: any;
  data$: Observable<DataState>;
  user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  @Input() userId: string = '';
  @Input() value: number = 0;
  @Input() selected: string = '';
  votesRevealed: boolean = false;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.user = res.participants.find((user: User) => user.id === this.userId);
      this.votesRevealed = res.room.revealed;
    });

    this.selected = this.user.vote;
  }
}
