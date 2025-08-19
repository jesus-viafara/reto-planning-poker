import { Component } from '@angular/core';
import { Room } from '../../models/room.model';
import { ModalCrearUsuarioComponent } from '../../components/modal-crear-usuario/modal-crear-usuario';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [ModalCrearUsuarioComponent],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class RoomComponent {
  room?: Room;
  user: User = { id: '', name: '', rol: '', modo: '' };
  isChildOpen = false;

  ngOnInit() {
    this.room = JSON.parse(localStorage.getItem('room') || '{}');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.user.id) {
      this.isChildOpen = true;
    }
  }
}
