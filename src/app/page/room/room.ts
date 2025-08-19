import { Component } from '@angular/core';
import { Room } from '../../models/room.model';
import { ModalCrearUsuarioComponent } from '../../components/modal-crear-usuario/modal-crear-usuario';
import { User, userList1, userList2 } from '../../models/user.model';
import { PokerTable } from '../../components/poker-table/poker-table';
import { PlayersPositions } from '../../components/players-positions/players-positions';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [ModalCrearUsuarioComponent, PokerTable, PlayersPositions],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class RoomComponent {
  room?: Room;
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
