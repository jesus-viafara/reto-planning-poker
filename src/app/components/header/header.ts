import { Component } from '@angular/core';
import { Room } from '../../models/room.model';
import { NameAvatarComponent } from '../name-avatar/name-avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NameAvatarComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  room: Room = { id: '', adminName: '', name: '', usersId: [] };
  avatarSize: string = 'small';
  adminName: string = '';

  ngOnInit() {
    this.room = JSON.parse(localStorage.getItem('room') || '{}');
    if (!this.room.adminName) {
      this.room.adminName = 'admin';
    }
    this.adminName = this.room.adminName;
  }
}
