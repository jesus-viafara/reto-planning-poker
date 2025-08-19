import { Component } from '@angular/core';
import { CrearPartidaComponent } from '../../components/crear-partida/crear-partida';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CrearPartidaComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  room?: Room;

  getRoom(room: Room) {
    this.room = room;
    console.log('Room received:', this.room);
  }
}
