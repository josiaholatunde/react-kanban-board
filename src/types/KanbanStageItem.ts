
// data model for each kanban stage item e.g. a sample object would be { id: '1', title: 'Creating a reusable component which belongs to a Todo stage', currentStage: 'Todo'}
// Creating a reusable component which belongs to a Todo stage. The current stage property is used to track the stage of an item
// when dragged to other stages
export type KanbanStageItem = {
    id: string;
    title: string;
    currentStage: string;
}