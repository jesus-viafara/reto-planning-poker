import { Component } from '@angular/core';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';
import { Result } from '../../models/result.model';
import { setResult, setRoom } from '../../state/actions/data.actions';
import { RevealingLoadding } from '../revealing-loadding/revealing-loadding';

@Component({
  selector: 'app-poker-table',
  imports: [RevealingLoadding],
  templateUrl: './poker-table.html',
  styleUrl: './poker-table.css',
})
export class PokerTable {
  data$: Observable<DataState>;
  readonly store: Store;
  room: Room = { id: '', name: '', state: 'hidden', adminName: '', cardSet: [], voteMode: ' ' };
  user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  result: Result = { totalVotes: 0, average: 0, voteCount: {} };
  participants: User[] = [];
  votes: string[] = [];

  constructor(store: Store<AppState>) {
    this.store = store;
    this.data$ = store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.room = { ...res.room };
      this.user = { ...res.user };
      this.participants = [...res.participants];
    });
  }

  extractAllNumbers(votes: string[]): number[] {
    const allNumbers = [];
    const numberRegex = /\d+/g; // Matches one or more digits globally

    for (const str of votes) {
      const numbersInString = str.match(numberRegex); // Returns an array of matched numbers or null
      if (numbersInString) {
        // Convert extracted strings to actual numbers and add to the result array
        allNumbers.push(...numbersInString.map(Number));
      }
    }
    return allNumbers;
  }

  getResults() {
    this.votes = [];
    for (const p of this.participants) {
      if (p.modo === 'jugador') {
        this.votes.push(p.vote);
      }
    }

    const realVotes: number[] = this.extractAllNumbers(this.votes);

    // Total number of votes
    this.result = { ...this.result, totalVotes: realVotes.length };

    // Sum of all votes
    const sumVotes = realVotes.reduce((acc, vote) => acc + vote, 0);

    // Average vote
    const average = this.result.totalVotes > 0 ? sumVotes / this.result.totalVotes : 0;
    this.result.average = Math.trunc(average * 100) / 100;

    this.votes.forEach((vote) => {
      this.result.voteCount[vote] = (this.result.voteCount[vote] || 0) + 1;
    });

    this.store.dispatch(setResult({ payload: this.result }));
    this.store.dispatch(setRoom({ payload: { ...this.room, state: 'revealed' } }));
  }

  onReset() {
    this.room.state = 'revealing';
    setTimeout(() => {
      this.result = { totalVotes: 0, average: 0, voteCount: {} };
      this.store.dispatch(setRoom({ payload: { ...this.room, state: 'hidden' } }));
      this.room.state = 'hidden';
    }, 2000);
  }

  onReveal() {
    this.room.state = 'revealing';
    setTimeout(() => {
      this.getResults();
      this.room.state = 'revealed';
    }, 3000);
  }
}
