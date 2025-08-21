import { Component, Input, Output } from '@angular/core';
import { Room } from '../../models/room.model';
import { NameAvatarComponent } from '../name-avatar/name-avatar';
import { ModalInviteLink } from '../modal-invite-link/modal-invite-link';
import { Observable } from 'rxjs';
import { DataState } from '../../models/dataState';
import { Store } from '@ngrx/store';
import { AppState, getData } from '../../state/selectors/data.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NameAvatarComponent, ModalInviteLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  data: any;
  data$: Observable<DataState>;
  @Input() adminName: string = '';
  @Output() adminname: string = '';
  room: Room = { id: '', adminName: '', name: '', state: 'hidden' };
  avatarSize: string = 'small';
  isInviteOpen = false;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(getData);
  }

  ngOnInit() {
    this.data$.subscribe((res: any) => {
      this.data = res;
    });

    this.room = { ...this.data.room };
  }
}
