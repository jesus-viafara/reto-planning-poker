import { createAction, props } from '@ngrx/store';
import { Room } from '../../models/room.model';

export const createRoom = createAction('[Room data] Create Room', props<{ room: Room }>());

export const getRoom = createAction('[Room data] Get Room', props<{ roomId: string }>());

// export const createRoom = createAction('[Room data] Create Room');
