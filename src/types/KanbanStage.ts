import { KanbanStageItem } from "./KanbanStageItem";


export type KanbanStage = {
    title: string;
    taskItems: KanbanStageItem[];
}