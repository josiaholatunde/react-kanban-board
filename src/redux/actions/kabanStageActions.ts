import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { KanbanStage } from '../../types/KanbanStage';
import { ActionTypes, ADD_STAGE, ADD_TASK_ITEM_TO_STAGE, CLEAR_STAGE, DELETE_STAGE, KANBAN_LOCAL_STORAGE_KEY, REMOVE_TASK_ITEM_FROM_STAGE, RENAME_STAGE, SET_ALL_STAGES } from './types';
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

export const renameStage = ( stageItem: any, callback?: any) => (dispatch: AuthDispatch) => {
    dispatch({ type: RENAME_STAGE, payload: {
        previous: stageItem.previousStageName,
        current: stageItem.name
    }});
    if (callback) callback()
};

export const deleteStage = ( stageName: any, callback?: any) => (dispatch: AuthDispatch) => {
    dispatch({ type: DELETE_STAGE, payload: {
       name: stageName
    }});
    if (callback) callback()
};

export const clearStage = ( stageName: any, callback?: any) => (dispatch: AuthDispatch) => {
    dispatch({ type: CLEAR_STAGE, payload: {
       name: stageName
    }});
    if (callback) callback()
};


export const removeTaskItemFromPreviousStage = (stageName: string, taskItemTitle: any) => (dispatch: AuthDispatch) => {
    dispatch({ type: REMOVE_TASK_ITEM_FROM_STAGE, payload: {
        name: stageName,
        taskItemTitle
    }});
};

export const fetchAllKanbanStages = () => (dispatch: AuthDispatch) => {
    const kanbanStages = JSON.parse(localStorage.getItem(KANBAN_LOCAL_STORAGE_KEY) || '[]');
    dispatch({ type: SET_ALL_STAGES, payload: kanbanStages });
};