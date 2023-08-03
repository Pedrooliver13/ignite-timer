// Packages
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
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
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondPassed, setAmountSecondsPassed] = useState(0);

  const setSecondPassed = (seconds: number): void => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = (): void => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        }

        return cycle;
      })
    );
  };

  const createNewCycle = (data: CreateCyclesFormData): void => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    // reset()
  };

  const interruptCycle = (): void => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }

        return cycle;
      })
    );

    setActiveCycleId(null);
  };

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  return (
    <CyclesContext.Provider
      value={{
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
