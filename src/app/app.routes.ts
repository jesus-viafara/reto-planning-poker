import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home';
import { RoomComponent } from './page/room/room';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'room/:name',
    component: RoomComponent,
  },
];
