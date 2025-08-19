import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/loading/loading';
import { HeaderComponent } from './components/header/header';
import { Room } from './models/room.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'planning-poker';
  room?: Room;

  isLoading = true;

  ngOnInit() {
    this.room = JSON.parse(localStorage.getItem('room') || '{}');
    setTimeout(() => {
      this.isLoading = false;
    }, 400);
  }
}
