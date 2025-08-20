import { Component, Input, Output } from '@angular/core';
import { Room } from '../../models/room.model';
import { NameAvatarComponent } from '../name-avatar/name-avatar';
import { ModalInviteLink } from '../modal-invite-link/modal-invite-link';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NameAvatarComponent, ModalInviteLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  @Input() adminName: string = '';
  @Output() adminname: string = '';
  room: Room = { id: '', adminName: '', name: '', usersId: [] };
  avatarSize: string = 'small';
  isInviteOpen = false;

  ngOnInit() {
    this.room = JSON.parse(localStorage.getItem('room') || '{}');
    if (!this.room.adminName) {
      this.room.adminName = 'admin';
    }
    this.adminName = this.room.adminName;
  }
}
