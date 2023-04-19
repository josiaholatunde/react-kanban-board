import React from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStageItem } from '../../types/KanbanStageItem';
import { useDraggable } from "@dnd-kit/core";
// import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"
// import { Draggable } from 'react-beautiful-dnd';
import './kanban.css';
type KanbanStageTaskItemProps = {
    taskItem: KanbanStageItem;
}
export const KanbanStageTaskItem: React.FC<KanbanStageTaskItemProps> = ({ taskItem }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: taskItem.title, data: taskItem, });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined
      
    return <Card 
    className="content-cardbody h-100 w-100 my-2 pointer draggable" 
    {...listeners}
    {...attributes}
    ref={setNodeRef}
    style={style}  >
        <Card.Body className='d-flex align-items-center' style={{height: '3rem'}}>
            <div> { taskItem && taskItem.title }</div>
        </Card.Body>
    </Card>

    // return <Draggable
    // key={taskItem.title}
    // draggableId={taskItem.title}
    // index = {taskItem.id}
    // className="content-cardbody h-100 w-100 my-2 pointer draggable" 

    //   >
    //     {(provided: any) => (<Card 
    // className="content-cardbody h-100 w-100 my-2 pointer draggable" 
    //     ref={provided.innerRef}
    //     {...provided.draggableProps}
    //     {...provided.dragHandleProps} >
    //     <Card.Body className='d-flex align-items-center' style={{height: '3rem'}}>
    //         <div> { taskItem && taskItem.title }</div>
    //     </Card.Body>
    // </Card>)}
    // </Draggable>
}