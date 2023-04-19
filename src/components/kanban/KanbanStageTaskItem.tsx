import React from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStageItem } from '../../types/KanbanStageItem';
import { useDraggable } from "@dnd-kit/core";
import './kanban.css';
type KanbanStageTaskItemProps = {
    taskItem: KanbanStageItem;
}
export const KanbanStageTaskItem: React.FC<KanbanStageTaskItemProps> = ({ taskItem }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: taskItem.title, data: taskItem, });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined

      console.log('agba', style);
    return <Card 
    className="content-cardbody h-100 w-100 my-2 pointer draggable" 
    {...listeners}
    {...attributes}
    ref={setNodeRef}
    style={{...style}}  >
        <Card.Body className='d-flex align-items-center' style={{height: '3rem'}}>
            <div> { taskItem && taskItem.title }</div>
        </Card.Body>
    </Card>
}