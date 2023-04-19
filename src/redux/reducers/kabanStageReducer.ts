import { KabanStageReducerState } from "./types/KabanStageReducerState";
import { PayloadAction } from '@reduxjs/toolkit';
import { ADD_STAGE, ADD_TASK_ITEM_TO_STAGE, CLEAR_STAGE, DELETE_STAGE, KANBAN_LOCAL_STORAGE_KEY, REMOVE_TASK_ITEM_FROM_STAGE, RENAME_STAGE, SET_ALL_STAGES } from "../actions/types";
import { saveDataToLocalStorage } from "../../util/localStorage";


const initialState: KabanStageReducerState = {
    kabanStages: [
        {
            name: 'Todo',
            taskItems: [
                {
                    id: '1',
                    title: 'Create a reusable component',
                    currentStage: 'Todo'
                }
            ]
        }
    ]
}

export default function kabanStageReducer(state = initialState, action: PayloadAction<any>) {
    let nextState;
    switch (action.type) {
        
        case SET_ALL_STAGES: 
            nextState = {
                kabanStages: action.payload || initialState.kabanStages
            }
            return nextState;
        case ADD_STAGE:
            nextState= {
                kabanStages: [...state.kabanStages, action?.payload]
            }
            saveDataToLocalStorage(KANBAN_LOCAL_STORAGE_KEY, nextState?.kabanStages);
            return nextState;
        case RENAME_STAGE:
            let stageToRenameIndex = state.kabanStages.findIndex(stage => stage.name === action.payload?.previous);
            if (stageToRenameIndex === -1) return state;
            const stageToBeRenamed = state.kabanStages[stageToRenameIndex];

            nextState = {
                kabanStages: [
                    ...state.kabanStages.slice(0, stageToRenameIndex),
                    {
                        ...stageToBeRenamed,
                        name: action?.payload.current
                    },
                    ...state.kabanStages.slice(stageToRenameIndex + 1)
                ]
            }
            saveDataToLocalStorage(KANBAN_LOCAL_STORAGE_KEY, nextState?.kabanStages);
            return nextState;
        case CLEAR_STAGE:
            let stageToClearIndex = state.kabanStages.findIndex(stage => stage.name === action.payload?.name);
            if (stageToClearIndex === -1) return state;
            const stageToBeCleared = state.kabanStages[stageToClearIndex];

            nextState = {
                kabanStages: [
                    ...state.kabanStages.slice(0, stageToClearIndex),
                    {
                        ...stageToBeCleared,
                        taskItems: []
                    },
                    ...state.kabanStages.slice(stageToClearIndex + 1)
                ]
            }
            saveDataToLocalStorage(KANBAN_LOCAL_STORAGE_KEY, nextState?.kabanStages);
            return nextState;
        case DELETE_STAGE:
            let stageToDeleteIndex = state.kabanStages.findIndex(stage => stage.name === action.payload?.name);
            if (stageToDeleteIndex === -1) return state;
            nextState = {
                kabanStages: [
                    ...state.kabanStages.slice(0, stageToDeleteIndex),
                    ...state.kabanStages.slice(stageToDeleteIndex + 1)
                ]
            }
            saveDataToLocalStorage(KANBAN_LOCAL_STORAGE_KEY, nextState?.kabanStages);
            return nextState;

        case ADD_TASK_ITEM_TO_STAGE:
            const currentIndex = state.kabanStages.findIndex(stage => stage.name === action.payload?.name);
            if (currentIndex === -1) return state;
            const currentStage = state.kabanStages[currentIndex];
            const taskItems = [...currentStage?.taskItems || [], action.payload.taskItem];

            nextState = {
                kabanStages: [
                    ...state.kabanStages.slice(0, currentIndex),
                    {
                        ...currentStage,
                        taskItems
                    },
                    ...state.kabanStages.slice(currentIndex + 1)
                ]
            }
            saveDataToLocalStorage(KANBAN_LOCAL_STORAGE_KEY, nextState?.kabanStages);
            return nextState;
        case REMOVE_TASK_ITEM_FROM_STAGE:
            const stageIndex = state.kabanStages.findIndex(stage => stage.name === action.payload?.name);
            if (stageIndex === -1) return state;
            const actualStage = state.kabanStages[stageIndex];
            const itemsWithoutPrevTask = [...actualStage?.taskItems.filter(taskItem => taskItem.title !== action.payload.taskItemTitle)];

            nextState = {
                kabanStages: [
                    ...state.kabanStages.slice(0, stageIndex),
                    {
                        ...actualStage,
                        taskItems: itemsWithoutPrevTask
                    },
                    ...state.kabanStages.slice(stageIndex + 1)
                ]
            }
            saveDataToLocalStorage(KANBAN_LOCAL_STORAGE_KEY, nextState?.kabanStages);
            return nextState;
        default:
            return state;
    }
}