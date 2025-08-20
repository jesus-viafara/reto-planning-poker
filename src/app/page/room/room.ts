import { Component } from '@angular/core';
import { Room } from '../../models/room.model';
import { ModalCrearUsuarioComponent } from '../../components/modal-crear-usuario/modal-crear-usuario';
import { User, userList1, userList2 } from '../../models/user.model';
import { PokerTable } from '../../components/poker-table/poker-table';
import { PlayersPositions } from '../../components/players-positions/players-positions';
import { ModalInviteLink } from '../../components/modal-invite-link/modal-invite-link';
import { CardList } from '../../components/card-list/card-list';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [ModalCrearUsuarioComponent, PokerTable, PlayersPositions, CardList, HeaderComponent],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class RoomComponent {
  room?: Room;
  adminName: string = 'default';
  user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  userList: User[] = [];
  isChildOpen = false;

  ngOnInit() {
    this.room = JSON.parse(localStorage.getItem('room') || '{}');
    this.userList = JSON.parse(localStorage.getItem('userList') || '[]');
    if (!this.room?.adminName) {
      this.isChildOpen = true;
    }
  }
}
