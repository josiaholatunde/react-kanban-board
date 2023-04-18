import React from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStageItem } from '../../types/KanbanStageItem';
import { useDraggable } from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities"

type KanbanStageTaskItemProps = {
    taskItem: KanbanStageItem;
}
export const KanbanStageTaskItem: React.FC<KanbanStageTaskItemProps> = ({ taskItem }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: taskItem.title, data: taskItem, });

    return <Card className="content-cardbody h-100 w-100 my-2" style={{ transform: CSS.Translate.toString(transform)  }} {...listeners}
    {...attributes}
    ref={setNodeRef} >
        <Card.Body className='d-flex align-items-center' style={{height: '3rem'}}>
            <div> { taskItem && taskItem.title }</div>
        </Card.Body>
    </Card>
}