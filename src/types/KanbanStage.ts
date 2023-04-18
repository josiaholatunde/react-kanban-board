import { KanbanStageItem } from "./KanbanStageItem";


export type KanbanStage = {
    name: string;
    taskItems: KanbanStageItem[];
}