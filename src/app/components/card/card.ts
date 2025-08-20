import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() user: User = { id: '', name: '', rol: '', modo: '', vote: '' };
  @Input() value: number = 0;
  @Input() selected: string = '';

  onVote(value: number) {
    this.selected = value.toString();
    console.log(this.selected);
  }
}
