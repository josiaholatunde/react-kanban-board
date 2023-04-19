import React, { useEffect, useState } from 'react';
import { KanbanStageColumn } from './KanbanStageColumn';
import { DndContext, rectIntersection  } from "@dnd-kit/core";
import { Card } from 'react-bootstrap';
import { AddStageColumn } from './AddStageColumn';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { addCardItemToStage, addNewStage, fetchAllKanbanStages, removeTaskItemFromPreviousStage, renameStage } from '../../redux/actions/kabanStageActions';
import { RootState } from '../../redux/store';
import { Breadcrumb } from 'antd';
import './kanban.css';
import { toast } from 'react-toastify';
import BlockUi from 'react-block-ui';


const KanbanBoard: React.FC<IProps> = ({ kabanStages }) => {

    const [shouldRenderAddStageColumn, setShouldRenderAddStageColumn] = useState(false);
    const dispatch = useDispatch();
    // default value for the max no of columns to be created. 
    // This allows for flexibility with modifying the default without carrying out separate deployments
    const MAX_COLUMNS_TO_BE_CREATED = Number(process.env.MAX_COLUMNS_TO_BE_CREATED) || 5;

    const handleOnDragEnd = (e: any) => {
        // get destination stage, check for its validity and add current task item to destination as well as remove same task from existing stage to prevent duplicates
        // also handle edge cases where destination is same as current stage or destination is invalid due to the user moving the mouse out of draggable scope
        const destination  = e.over?.id;
        const taskItemTitle = e.active.data.current?.title ?? "";
        const taskItemPrevStage = e.active.data.current?.currentStage;
        const taskItemId = e.active.data.current?.id;
        console.log('Omo 2', taskItemTitle, taskItemPrevStage, taskItemId);

        if (!destination || destination === taskItemPrevStage) return;
        dispatch(addCardItemToStage(destination, {
            id: taskItemId,
            title: taskItemTitle,
            currentStage: destination
        }))
        dispatch(removeTaskItemFromPreviousStage(taskItemPrevStage, taskItemTitle));
    }

    const handleRenderStageColumn = () => {
        setShouldRenderAddStageColumn(true);
    }

    const renderAddColumnButton = () => {
       return <div className='primary-text pointer' onClick={handleRenderStageColumn}>Add Column</div>
    }

    const addStage = (newStage: any) => {

        dispatch(addNewStage(newStage, () => {
            // check if no of stages created is one less than the max(4) since this update was successful. Another approach would be to check the store state for the exact count
            if (kabanStages.length === MAX_COLUMNS_TO_BE_CREATED - 1) return toast.info('You have reached the max number of columns that can be created')
        }))
        setShouldRenderAddStageColumn(false);
    }

    const handleCancelAddStage = () => {
        setShouldRenderAddStageColumn(false);
    }

    const doesStageNamePreviouslyExist = (stageName: string): boolean => {
        return kabanStages.map((stage: any) => stage.name).includes(stageName);
    }

    const displayAdditionalKabanContent = () => {
        if (kabanStages.length === MAX_COLUMNS_TO_BE_CREATED) return <></>;
        return <Card className="content-cardbody add-column">
                <Card.Body>
                   { shouldRenderAddStageColumn ? <AddStageColumn doesStageNamePreviouslyExist={doesStageNamePreviouslyExist} addStage={addStage} handleCancelAddStage={handleCancelAddStage} /> : 
                   renderAddColumnButton() } 
                </Card.Body>
            </Card>
    }

    const handleRenameStage = (stageName: any, callBack: any) => {
        if (doesStageNamePreviouslyExist(stageName.name)) {
            return toast.error('Stage name has been taken');
        }
        dispatch(renameStage(stageName, callBack))
      
    }

    useEffect(() => {
        // when the app loads or browser is refreshed, initialize kanban stages with default or from local storage
        // should ideally be from a remote server
        dispatch(fetchAllKanbanStages());
    }, [])


    return <div className="container my-5 p-0">
        <h2>Welcome to Safaricom Kanban board</h2>
           <div className='my-5'>
            <Breadcrumb separator=">">
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href="/">Kanban</Breadcrumb.Item>
            </Breadcrumb>
           </div>
            <BlockUi blocking={false}>
                <DndContext collisionDetection={rectIntersection} onDragEnd={handleOnDragEnd}>
                    <div className='row kaban-stage-container'>
                        {
                            kabanStages.map((stageItem: any, index: number) => 
                            <KanbanStageColumn key={index} stageItem={stageItem} renameStage={handleRenameStage}  />)
                        }
                        <div> { displayAdditionalKabanContent() } </div>
                    </div>
                    
                </DndContext> 
            </BlockUi>
          
    </div>
}


const mapStateToProps = ({ kabanStages }: RootState) => ({
    kabanStages: kabanStages.kabanStages,

});
const connector = connect(mapStateToProps);
type IProps = ConnectedProps<typeof connector>;
export default connector(KanbanBoard);