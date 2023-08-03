// Packages
import { ReactElement } from "react";
import { useFormContext } from "react-hook-form";

// Contexts
import { useCyclesContext } from "contexts/useCycleContext";

// Styles
import * as Styled from "./styles";

export const NewCycleForm = (): ReactElement => {
  const { activeCycle } = useCyclesContext();
  const { register } = useFormContext();

  return (
    <Styled.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <Styled.TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Opção 1" />
        <option value="Opção 2" />
        <option value="3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <Styled.MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </Styled.FormContainer>
  );
};
