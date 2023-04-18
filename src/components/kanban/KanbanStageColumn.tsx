import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStage } from '../../types/KanbanStage';
import { KanbanStageTaskItem } from './KanbanStageTaskItem';
import { Menu, Dropdown } from 'antd'
import getItem from '../../util/menu';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AddCard } from './AddCard';
import { useDispatch } from 'react-redux';
import { addCardItemToStage } from '../../redux/actions/kabanStageActions';
import { useDroppable } from "@dnd-kit/core";
import './kanban.css';


type KanbanStageColumnProps = {
    stageItem: KanbanStage;
}
export const KanbanStageColumn: React.FC<KanbanStageColumnProps> = ({ stageItem: { name, taskItems } }) => {
    const [shouldDisplayAddCardForm, setShouldDisplayAddCardForm] = useState(false);
    const contentMoreOverlay = (name: string) => <Menu items={[
        getItem(<div onClick={() => renameStage(name)} > Rename </div>, '1'),
        getItem(<div onClick={() => clearStage(name)} > Clear </div>, '2'),
        getItem(<div onClick={() => deleteStage(name)} > Delete </div>, '3'),
      ]} />
      const { setNodeRef } = useDroppable({
        id: name,
      });

      const dispatch = useDispatch()

      const renameStage = (name: string) => {}
      const clearStage = (name: string) => {}
      const deleteStage = (name: string) => {}

      const handleRenderAddCard = () => {
        setShouldDisplayAddCardForm(true);
      }

      const handleCancelAddCardToStage = () => {
        setShouldDisplayAddCardForm(false);
      }

      const handleAddCardToStage = (taskItem: any) => {
        dispatch(addCardItemToStage(name, taskItem));
        setShouldDisplayAddCardForm(false);
      }

      const renderAddCardButton = () => {
        return <div className='primary-text' style={{ cursor: 'pointer'}} onClick={handleRenderAddCard}> Add Card </div>
      }

    return <div className='mx-2 stage-card'>
        <Card className="h-100" style={{ width: '270px' }}>
            <Card.Title className='p-3 d-flex justify-content-between' style={{ borderBottom: '1px solid #ccc'}}> 
                <div>{ name } </div>
                <Dropdown overlay={() => contentMoreOverlay(name)} children={<MoreOutlined />} />
            </Card.Title>
            <Card.Body ref={setNodeRef}>
           
                <div className='d-flex justify-content-between align-items-center flex-wrap'>
                    { taskItems.map((taskItem, index) => (<KanbanStageTaskItem key={index} taskItem={taskItem} />))}
                </div>
        
            </Card.Body>
            <Card.Footer className="bg-white text-center"  > 
                { shouldDisplayAddCardForm ? <AddCard stageName={name} addCardToStage={handleAddCardToStage} handleCancelAddCardToStage={handleCancelAddCardToStage} /> : renderAddCardButton() } 
            </Card.Footer>
    </Card>
    </div>
}