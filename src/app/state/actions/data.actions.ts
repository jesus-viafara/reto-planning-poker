import { createAction, props } from '@ngrx/store';
import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';
import { Result } from '../../models/result.model';

export const actionsList = {
  getData: '[App Component] get store data',
  setRoom: '[Home Component] Room data save successfully',
  setUser: '[App Component] User data save successfully',
  setParticipants: '[App Component] Participants  save successfully',
  setResult: '[App Component] Votes result save successfully',
};

export const getData = createAction(actionsList.getData);
export const setRoom = createAction(actionsList.setRoom, props<{ payload: Room }>());
export const setUser = createAction(actionsList.setUser, props<{ payload: User }>());
export const setResult = createAction(actionsList.setResult, props<{ payload: Result }>());
export const setParticipants = createAction(
  actionsList.setParticipants,
  props<{ payload: User[] }>()
);
