// Packages
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Reducers
import { Cycle, cyclesReducers } from "reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "reducers/cycles/actions";

interface CreateCyclesFormData {
  task: string;
  minutesAmount: number;
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

interface CyclesProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export const CycleProvider = ({
  children,
}: CyclesProviderProps): ReactElement => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducers,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJson = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson);
      }
    }
  );
  const [amountSecondPassed, setAmountSecondsPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesState;

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJson);
  }, [cyclesState]);

  const setSecondPassed = (seconds: number): void => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = (): void => {
    dispatch(markCurrentCycleAsFinishedAction(cyclesState.activeCycleId));
  };

  const createNewCycle = (data: CreateCyclesFormData): void => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  };

  const interruptCycle = (): void => {
    dispatch(interruptCurrentCycleAction(activeCycleId));
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
