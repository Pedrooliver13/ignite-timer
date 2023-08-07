// Reducers
import { Cycle } from "reducers/cycles/reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

export interface ActionResponse<T> {
  type: string;
  payload: {
    [name: string]: T;
  };
}

export const addNewCycleAction = (newCycle: Cycle): ActionResponse<Cycle> => {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
};

export const interruptCurrentCycleAction = (
  activeCycleId: string | null
): ActionResponse<string | null> => {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    payload: {
      activeCycleId,
    },
  };
};

export const markCurrentCycleAsFinishedAction = (
  activeCycleId: string | null
): ActionResponse<string | null> => {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    payload: {
      activeCycleId,
    },
  };
};
