import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './name-avatar.html',
  styleUrl: './name-avatar.css',
})
export class NameAvatarComponent {
  @Input() adminName = '';
  @Input() size = '';
}
