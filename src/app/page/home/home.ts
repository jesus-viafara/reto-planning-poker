import { Component } from '@angular/core';
import { CrearPartidaComponent } from '../../components/crear-partida/crear-partida';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CrearPartidaComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  ngOnInit(): void {
    localStorage.removeItem('data');
  }
}
