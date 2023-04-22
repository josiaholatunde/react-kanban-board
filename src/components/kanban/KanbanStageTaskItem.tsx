import React from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStageItem } from '../../types/KanbanStageItem';
import { useDraggable } from "@dnd-kit/core";
import { Menu, Dropdown } from 'antd'
import Swal from 'sweetalert2';
import './kanban.css';
import getItem from '../../util/menu';
import { MoreOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { removeTaskItemFromPreviousStage } from '../../redux/actions/kabanStageActions';
import { useDispatch } from 'react-redux';

type KanbanStageTaskItemProps = {
    taskItem: KanbanStageItem;
    handleDisplayEditCardForm: (title: string) => void;
}
export const KanbanStageTaskItem: React.FC<KanbanStageTaskItemProps> = ({ taskItem, handleDisplayEditCardForm }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({id: taskItem.title, data: taskItem, });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined

      const dispatch = useDispatch();

      const contentMoreOverlay = (title: string) => <Menu items={[
        getItem(<div className='pointer' onClick={(event: any) => {event.stopPropagation(); handleDisplayEditCardForm(title)}} > Edit </div>, '10000'),
        getItem(<div className='pointer' onClick={handleDisplayDeleteTask} > Delete </div>, '30000'),
      ]} />

      const handleDisplayDeleteTask = (event: any) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        handleDeleteTask();
      };

      const handleDeleteTask = () => {
        return Swal.fire({
            title: '<strong style="color: #f01d1d">Delete Task</strong>',
            text: `Are you sure you want to delete this task ?`,
            icon: 'error',
            confirmButtonColor: '#f01d1d',
            confirmButtonText: `Yes`,
            showCancelButton: true,
        }).then(async (results: any) => {
            if (results.value) {
                dispatch(removeTaskItemFromPreviousStage(taskItem.currentStage, taskItem.title, () => {
                    toast.success('Successfully deleted task');
                }))
            }
        });
       
      } 


    return <Card 
    className="content-cardbody h-100 w-100 my-2 pointer draggable" 
    {...attributes}
    ref={setNodeRef}
    style={{...style}}  >
        <div className='d-flex justify-content-end pt-1'>
            <Dropdown overlay={() => contentMoreOverlay(taskItem?.title)} children={<MoreOutlined />} />
        </div>
        <Card.Body {...listeners} className='d-flex' style={{height: '3rem', padding: '0 1.25rem' }}>
            <div> { taskItem && taskItem.title }</div>
        </Card.Body>
    </Card>
}