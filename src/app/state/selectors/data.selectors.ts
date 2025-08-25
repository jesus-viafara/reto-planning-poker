import { createSelector } from '@ngrx/store';
import { DataState } from '../../models/dataState';

export interface AppState {
  data: DataState;
}

export const selectFeature = (state: AppState) => state.data;

export const getData = createSelector(selectFeature, (state: DataState) => state);
