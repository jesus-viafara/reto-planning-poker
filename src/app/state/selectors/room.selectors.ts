import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { RoomState } from '../../models/room.state';

export const selectRoom = (state: AppState) => state.room;

export const selectedRoom = createSelector(selectRoom, (state: RoomState) => state.room);
