import { DeepReadonly } from 'utility-types';
import { KanbanStage } from '../../../types/KanbanStage';


interface IKabanStageReducerState {
    kabanStages: KanbanStage[]
}


export type KabanStageReducerState = DeepReadonly<IKabanStageReducerState>;
