import { ActionReducerMap } from '@ngrx/store';
import { roomReducer } from './reducers/room.reducer';
import { RoomState } from '../models/room.state';

export interface AppState {
  room: RoomState;
  // user: User;
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
  room: roomReducer,
  // user: roomReducer,
};
