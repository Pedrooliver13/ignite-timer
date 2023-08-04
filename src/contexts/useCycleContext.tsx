// Packages
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

interface CreateCyclesFormData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCyclesFormData) => void;
  interruptCycle: () => void;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

interface CyclesProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export const CycleProvider = ({
  children,
}: CyclesProviderProps): ReactElement => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case "INTERRUPT_CURRENT_CYCLE":
          return {
            ...state,
            activeCycleId: null,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() };
              }

              return cycle;
            }),
          };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              }

              return cycle;
            }),
          };
        default:
          return state;
      }
    },
    { cycles: [], activeCycleId: null }
  );
  const [amountSecondPassed, setAmountSecondsPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesState;

  const setSecondPassed = (seconds: number): void => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = (): void => {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
  };

  const createNewCycle = (data: CreateCyclesFormData): void => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0);
  };

  const interruptCycle = (): void => {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  };

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondPassed,
        setSecondPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCyclesContext = (): CyclesContextType =>
  useContext(CyclesContext);
