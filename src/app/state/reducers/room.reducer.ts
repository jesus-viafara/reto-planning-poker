import { createReducer, on } from '@ngrx/store';
import { createRoom, getRoom } from '../actions/room.actions';
import { RoomState } from '../../models/room.state';

export const initialState: RoomState = {
  loading: false,
  room: { id: '', name: '', adminName: '', usersId: [] },
};

export const roomReducer = createReducer(
  initialState,
  on(createRoom, (state, { room }) => {
    return { ...state, room };
  }),
  on(getRoom, (state, { roomId }) => {
    return { ...state };
  })
);
