import { createReducer, on } from '@ngrx/store';
import { DataState } from '../../models/dataState';
import { setParticipants, setResult, setRoom, setUser } from '../actions/data.actions';

export const initialState: Readonly<DataState> = {
  room: { id: '', name: '', state: 'hidden', adminName: '' },
  user: { id: '', name: 'default', modo: 'espectador', rol: '', vote: '?' },
  result: { totalVotes: 0, average: 0, voteCount: { '0': 0 } },
  participants: [],
};

export const dataReducer = createReducer(
  initialState,
  on(setRoom, (state, { payload }) => {
    localStorage.setItem('data', JSON.stringify({ ...state, room: payload }));
    return { ...state, room: payload };
  }),
  on(setUser, (state, { payload }) => {
    localStorage.setItem('data', JSON.stringify({ ...state, user: payload }));
    return { ...state, user: payload };
  }),
  on(setResult, (state, { payload }) => {
    localStorage.setItem('data', JSON.stringify({ ...state, result: payload }));
    return { ...state, result: payload };
  }),
  on(setParticipants, (state, { payload }) => {
    localStorage.setItem('data', JSON.stringify({ ...state, participants: payload }));
    return { ...state, participants: payload };
  })
);
