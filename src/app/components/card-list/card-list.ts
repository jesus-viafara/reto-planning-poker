import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { setUser, setParticipants } from '../../state/actions/data.actions';
import { User } from '../../models/user.model';
import { Result } from '../../models/result.model';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-card-list',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css',
})
export class CardList {
  data: any;
  data$: Observable<DataState>;
  user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  room?: Room;
  userList: User[] = [];
  result: Result = { totalVotes: 0, average: 0, voteCount: { '0': 0 } };
  selectedOption: string = '?';
  ramdomSerie: number[] = this.seriePersonalizada(10);
  isSelected: boolean = false;
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    vote: this.fb.control(''),
  });

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(getData);
  }

  seriePersonalizada(n: number) {
    const secuencia = [];
    let valor = 1;
    for (let i = 0; i < n; i++) {
      secuencia.push(valor);
      if (i % 2 === 0) {
        valor += 3;
      } else {
        valor *= 2;
      }
    }
    return secuencia;
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.user = res.user;
      this.room = res.room;
      this.result = { ...res.result };
    });
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
