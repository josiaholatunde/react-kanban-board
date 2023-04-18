import React from 'react';
import { KanbanStage } from '../../types/KanbanStage';
import { KanbanStageColumn } from './KanbanStageColumn';

type KanbanBoardProps = {
    stageItems: KanbanStage[]
}

const stages: KanbanStage[] = [
    {
        title: 'Todo',
        taskItems: [
            {
                id: '1',
                title: 'Create a reusable component',
                currentStage: 'Todo'
            }
        ]
    }
]
export const KanbanBoard: React.FC<KanbanBoardProps> = ({ stageItems }) => {


    return <div className="container my-5">
        <h2>Welcome to Kanban board</h2>
        {
            stages.map((stageItem, index) => 
            <KanbanStageColumn key={index} stageItem={stageItem}  />)
        }
    </div>
}