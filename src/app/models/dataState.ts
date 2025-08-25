import { Result } from './result.model';
import { Room } from './room.model';
import { User } from './user.model';

export interface DataState {
  room: Room;
  participants: User[];
  user: User;
  result: Result;
}
