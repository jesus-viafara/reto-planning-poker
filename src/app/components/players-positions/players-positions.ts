import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { NameAvatarComponent } from '../name-avatar/name-avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players-positions',
  imports: [NameAvatarComponent, CommonModule],
  templateUrl: './players-positions.html',
  styleUrl: './players-positions.css',
})
export class PlayersPositions {
  @Input() userList: User[] = [];
  playerPosition: string[] = [
    'bottom-center',
    'top-left',
    'top-center',
    'top-right',
    'left',
    'right',
    'bottom-left',
    'bottom-right',
  ];
}
