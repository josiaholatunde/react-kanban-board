import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';

export const ADD_STAGE = 'ADD_STAGE';
export const ADD_TASK_ITEM_TO_STAGE = 'ADD_TASK_ITEM_TO_STAGE'
export const REMOVE_TASK_ITEM_FROM_STAGE = 'REMOVE_TASK_ITEM_FROM_STAGE'




export type ActionTypes =
    | typeof ADD_STAGE
    | typeof ADD_TASK_ITEM_TO_STAGE
    | typeof REMOVE_TASK_ITEM_FROM_STAGE;


export type ActionDispatch<T = unknown, S = unknown> = ThunkDispatch<T, S, Action<ActionTypes>>;