import { Room } from './room.model';

export interface RoomState {
  loading: boolean;
  room: Readonly<Room>;
}
