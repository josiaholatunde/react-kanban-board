import React from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStageItem } from '../../types/KanbanStageItem';

type KanbanStageTaskItemProps = {
    taskItem: KanbanStageItem;
}
export const KanbanStageTaskItem: React.FC<KanbanStageTaskItemProps> = ({ taskItem }) => {

    return <Card className="content-cardbody h-100 w-100">
        <Card.Body>
            <div> { taskItem && taskItem.title }</div>
        </Card.Body>
    </Card>
}