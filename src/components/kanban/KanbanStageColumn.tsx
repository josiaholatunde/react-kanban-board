import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStage } from '../../types/KanbanStage';
import { KanbanStageTaskItem } from './KanbanStageTaskItem';
import { Menu, Dropdown } from 'antd'
import getItem from '../../util/menu';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AddCard } from './AddCard';


type KanbanStageColumnProps = {
    stageItem: KanbanStage;
}
export const KanbanStageColumn: React.FC<KanbanStageColumnProps> = ({ stageItem: { title, taskItems } }) => {
    const [shouldDisplayAddCardForm, setShouldDisplayAddCardForm] = useState(false);
    const contentMoreOverlay = (title: string) => <Menu items={[
        getItem(<div onClick={() => renameStage(title)} > Rename </div>, '1'),
        getItem(<div onClick={() => clearStage(title)} > Clear </div>, '2'),
        getItem(<div onClick={() => deleteStage(title)} > Delete </div>, '3'),
      ]} />

      const renameStage = (title: string) => {}
      const clearStage = (title: string) => {}
      const deleteStage = (title: string) => {}

      const handleRenderAddCard = () => {
        setShouldDisplayAddCardForm(true);
      }

      const handleCancelAddCardToStage = () => {
        setShouldDisplayAddCardForm(false);
      }

      const handleAddCardToStage = (taskItem: any) => {
        // addCardItemToStage(taskItem);
        setShouldDisplayAddCardForm(false);
      }

      const renderAddCardButton = () => {
        return <div style={{ color: 'purple', cursor: 'pointer'}} onClick={handleRenderAddCard}> Add Card </div>
      }

    return <Card className="content-cardbody h-100" style={{ width: '330px' }}>
         <Card.Title className='p-3 d-flex justify-content-between' style={{ borderBottom: '1px solid #ccc'}}> 
                <div>{ title } </div>
                <Dropdown overlay={() => contentMoreOverlay(title)} children={<MoreOutlined />} />
        </Card.Title>
        <Card.Body>
           
            <div className='d-flex justify-content-between'>
                { taskItems.map(taskItem => (<KanbanStageTaskItem taskItem={taskItem} />))}
            </div>
        
        </Card.Body>
        <Card.Footer className="bg-white text-center"  > 
           { shouldDisplayAddCardForm ? <AddCard addCardToStage={handleAddCardToStage} handleCancelAddCardToStage={handleCancelAddCardToStage} /> : renderAddCardButton() } 

        </Card.Footer>
    </Card>
}