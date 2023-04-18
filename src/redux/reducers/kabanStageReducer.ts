import { KabanStageReducerState } from "./types/KabanStageReducerState";
import { PayloadAction } from '@reduxjs/toolkit';
import { ADD_STAGE, ADD_TASK_ITEM_TO_STAGE, REMOVE_TASK_ITEM_FROM_STAGE } from "../actions/types";



const initialState: KabanStageReducerState = {
    kabanStages:  [
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

export default function (state = initialState, action: PayloadAction<any>)  {

    switch(action.type) {
        case ADD_STAGE:
            return {
                kabanStages: [...state.kabanStages, action?.payload ]
            }
        case ADD_TASK_ITEM_TO_STAGE:
            const currentIndex = state.kabanStages.findIndex(stage => stage.name === action.payload?.name);
            if (currentIndex == -1) return state;
            const currentStage = state.kabanStages[currentIndex];
            const taskItems = [...currentStage?.taskItems || [], action.payload.taskItem];
            
            return {
                kabanStages: [
                    ...state.kabanStages.slice(0, currentIndex),
                    {
                        ...currentStage,
                        taskItems
                    },
                    ...state.kabanStages.slice(currentIndex + 1)
                ]
            }
            case REMOVE_TASK_ITEM_FROM_STAGE:
                const stageIndex = state.kabanStages.findIndex(stage => stage.name === action.payload?.name);
                if (stageIndex == -1) return state;
                const actualStage = state.kabanStages[stageIndex];
                const itemsWithoutPrevTask = [...actualStage?.taskItems.filter(taskItem => taskItem.title !== action.payload.taskItemTitle)];
            
            return {
                kabanStages: [
                    ...state.kabanStages.slice(0, stageIndex),
                    {
                        ...actualStage,
                        taskItems: itemsWithoutPrevTask
                    },
                    ...state.kabanStages.slice(stageIndex + 1)
                ]
            }
        default:
            return state;
    }
}