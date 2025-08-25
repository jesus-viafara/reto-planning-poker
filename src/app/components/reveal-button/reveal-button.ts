import { Component } from '@angular/core';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';

@Component({
  selector: 'app-reveal-button',
  imports: [],
  templateUrl: './reveal-button.html',
  styleUrl: './reveal-button.css',
})
export class RevealButton {
  data: any;
  data$: Observable<DataState>;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(getData);
  }

  onClick() {
    this.data$.subscribe((res: any) => {
      this.data = res;
    });

    
  }
}
