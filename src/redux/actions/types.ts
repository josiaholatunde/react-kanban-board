import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';

export const ADD_STAGE = 'ADD_STAGE';
export const RENAME_STAGE = 'RENAME_STAGE';
export const CLEAR_STAGE = 'CLEAR_STAGE';
export const DELETE_STAGE = 'DELETE_STAGE';
export const SET_ALL_STAGES = 'SET_ALL_STAGES';

export const ADD_TASK_ITEM_TO_STAGE = 'ADD_TASK_ITEM_TO_STAGE'
export const REMOVE_TASK_ITEM_FROM_STAGE = 'REMOVE_TASK_ITEM_FROM_STAGE'


export const KANBAN_LOCAL_STORAGE_KEY = 'kabanStages'


export type ActionTypes =
    | typeof ADD_STAGE
    | typeof ADD_TASK_ITEM_TO_STAGE
    | typeof REMOVE_TASK_ITEM_FROM_STAGE
    | typeof RENAME_STAGE
    | typeof CLEAR_STAGE
    | typeof DELETE_STAGE
    | typeof SET_ALL_STAGES;



export type ActionDispatch<T = unknown, S = unknown> = ThunkDispatch<T, S, Action<ActionTypes>>;