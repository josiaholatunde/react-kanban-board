import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { KanbanStage } from '../../types/KanbanStage';
import { KanbanStageTaskItem } from './KanbanStageTaskItem';
import { Menu, Dropdown } from 'antd'
import getItem from '../../util/menu';
import { MoreOutlined } from '@ant-design/icons';
import { AddCard } from './AddCard';
import { useDispatch } from 'react-redux';
import { addCardItemToStage, clearStage, deleteStage, editTask } from '../../redux/actions/kabanStageActions';
import { useDroppable } from "@dnd-kit/core";
import './kanban.css';
import { RenameStageForm } from './RenameStageForm';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { EditCardForm } from './EditCardForm';


type KanbanStageColumnProps = {
    stageItem: KanbanStage;
    renameStage: (taskItem: any, callBack?: Function) => void
}

enum FooterAction {
    DISPLAY_ADD_CARD_FORM,
    DISPLAY_ADD_CARD_BUTTON,
    DISPLAY_EDIT_CARD_FORM,
    DISPLAY_RENAME_STAGE_FORM
}
export const KanbanStageColumn: React.FC<KanbanStageColumnProps> = ({ stageItem: { name, taskItems }, renameStage }) => {
    const [footerAction, setFooterAction] = useState<FooterAction>(FooterAction.DISPLAY_ADD_CARD_BUTTON);
    const [cardToEditTitle, setCardToEditTitle] = useState<string>('');

    const contentMoreOverlay = (name: string) => <Menu items={[
        getItem(<div onClick={() => handleDisplayRenameStage(name)} > Rename </div>, '1'),
        getItem(<div onClick={() => handleClearStage(name)} > Clear </div>, '2'),
        getItem(<div onClick={() => handleDeleteStage(name)} > Delete </div>, '3'),
      ]} />
      const { setNodeRef } = useDroppable({
        id: name,
      });

      const dispatch = useDispatch()

      const handleDisplayRenameStage = (name: string) => {
        setFooterAction(FooterAction.DISPLAY_RENAME_STAGE_FORM)
      }
      const handleClearStage = (name: string) => {
        return Swal.fire({
            title: '<strong style="color: #f01d1d">Clear Items</strong>',
            text: `Are you sure you want to clear all the items in this stage with name ${name}?`,
            icon: 'error',
            confirmButtonColor: '#f01d1d',
            confirmButtonText: `Yes`,
            showCancelButton: true,
        }).then(async (results: any) => {
            if (results.value) {
                dispatch(clearStage(name, () => {
                    toast.success('Successfully cleared stage');
                }))
            }
        });
      }
      const handleDeleteStage = (name: string) => {
        return Swal.fire({
            title: '<strong style="color: #f01d1d">Delete Kanban Board Stage</strong>',
            text: `Are you sure you want to delete stage with name ${name}?`,
            icon: 'error',
            confirmButtonColor: '#f01d1d',
            confirmButtonText: `Yes`,
            showCancelButton: true,
        }).then(async (results: any) => {
            if (results.value) {
                dispatch(deleteStage(name, () => {
                    toast.success('Successfully deleted stage');
                }))
            }
        });
       
      }

      const handleRenderAddCard = () => {
        setFooterAction(FooterAction.DISPLAY_ADD_CARD_FORM);
      }

      const handleCancelAddCardToStage = () => {
        setFooterAction(FooterAction.DISPLAY_ADD_CARD_BUTTON);
      }

      const handleDisplayEditCardForm = (title: string) => {
        setCardToEditTitle(title);
        setFooterAction(FooterAction.DISPLAY_EDIT_CARD_FORM);
      }

      const handleEditCardForm = (previousTaskTitle: string, currentTitle: string, callback?: Function) => {
        dispatch(editTask(name, previousTaskTitle, currentTitle, callback))
        setCardToEditTitle('')
        setFooterAction(FooterAction.DISPLAY_ADD_CARD_BUTTON);
      }

      const handleCancelRenameStage = () => {
        setFooterAction(FooterAction.DISPLAY_ADD_CARD_BUTTON);
      }

      const handleCancelEditCardToStage = () => {
        setCardToEditTitle('')
        setFooterAction(FooterAction.DISPLAY_ADD_CARD_BUTTON);
      }

      const handleAddCardToStage = (taskItem: any) => {
        dispatch(addCardItemToStage(name, taskItem));
        setFooterAction(FooterAction.DISPLAY_ADD_CARD_BUTTON);
      }


      const renderFooter = () => {
        switch (footerAction) {
            case FooterAction.DISPLAY_ADD_CARD_FORM:
                return <AddCard stageName={name} addCardToStage={handleAddCardToStage} handleCancelAddCardToStage={handleCancelAddCardToStage} />
            case FooterAction.DISPLAY_RENAME_STAGE_FORM:
                return <RenameStageForm stageName={name} handleCancelRenameStage={handleCancelRenameStage} renameStage={(e, callback) => {
                        renameStage(e, callback);
                        setFooterAction(FooterAction.DISPLAY_ADD_CARD_BUTTON);
                    }} />
                    case FooterAction.DISPLAY_EDIT_CARD_FORM:
                        return <EditCardForm taskTitle={cardToEditTitle} editCard={handleEditCardForm} handleCancelEditCardToStage={handleCancelEditCardToStage} />
            default:
                return renderAddCardButton()
        }
      }

      const renderAddCardButton = () => {
        return <div className='primary-text' style={{ cursor: 'pointer'}} onClick={handleRenderAddCard}> Add Card </div>
      }

    return <div className='mx-2 stage-card'>
        <Card className="h-100">
            <Card.Title className='p-3 d-flex justify-content-between' style={{ borderBottom: '1px solid #ccc'}}> 
                <div>{ name } </div>
                <Dropdown overlay={() => contentMoreOverlay(name)} children={<MoreOutlined />} />
            </Card.Title>
            <Card.Body ref={setNodeRef}>
           
                <div className='d-flex justify-content-between align-items-center flex-wrap'>
                    { taskItems.map((taskItem, index) => (<KanbanStageTaskItem key={index} taskItem={taskItem} handleDisplayEditCardForm={handleDisplayEditCardForm}   />))}
                </div>
        
            </Card.Body>
            <Card.Footer className="bg-white text-center"  > 
                { renderFooter() }
            </Card.Footer>
    </Card>
    </div>
}