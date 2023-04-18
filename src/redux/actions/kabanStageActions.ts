import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { KanbanStage } from '../../types/KanbanStage';
import { ActionTypes, ADD_STAGE, ADD_TASK_ITEM_TO_STAGE, REMOVE_TASK_ITEM_FROM_STAGE } from './types';
type AuthDispatch<T = unknown, S = unknown> = ThunkDispatch<T, S, Action<ActionTypes>>;



export const addNewStage = (stage: KanbanStage, callback?: any) => (dispatch: AuthDispatch) => {
    dispatch({ type: ADD_STAGE, payload: stage });
    if (callback) callback();
};

export const addCardItemToStage = (stageName: string, taskItem: any) => (dispatch: AuthDispatch) => {
    dispatch({ type: ADD_TASK_ITEM_TO_STAGE, payload: {
        name: stageName,
        taskItem
    }});
};


export const removeTaskItemFromPreviousStage = (stageName: string, taskItemTitle: any) => (dispatch: AuthDispatch) => {
    dispatch({ type: REMOVE_TASK_ITEM_FROM_STAGE, payload: {
        name: stageName,
        taskItemTitle
    }});
};