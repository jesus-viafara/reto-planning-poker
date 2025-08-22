import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DataState } from '../../models/dataState';
import { Observable } from 'rxjs';
import { AppState, getData } from '../../state/selectors/data.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-name-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './name-avatar.html',
  styleUrl: './name-avatar.css',
})
export class NameAvatarComponent {
  @Input() userName: string = 'admin';
  @Input() size = '';
  @Input() type = '';
  data: any;
  data$: Observable<DataState>;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      if (this.type === 'user') {
        this.userName = res.user.name;
      } else if (this.type === 'player') {
        this.userName = res.room.adminName;
      }
    });
  }
}
