// Packages
import { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HandPalm as HandPalmIcon, Play as PlayIcon } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// Contexts
import { useCyclesContext } from "contexts/useCycleContext";

// Components
import { Countdown } from "./components/countdown";
import { NewCycleForm } from "./components/newCycleForm";

// Styles
import * as Styled from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = (): ReactElement => {
  const { activeCycle, createNewCycle, interruptCycle } = useCyclesContext();

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { reset, handleSubmit, watch } = newCycleForm;

  const handleCreateNewCycle = (data: NewCycleFormData): void => {
    createNewCycle(data);
    reset();
  };

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <Styled.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <Styled.StopCountdownButton onClick={interruptCycle} type="submit">
            <HandPalmIcon size={24} />
            Interromper
          </Styled.StopCountdownButton>
        ) : (
          <Styled.StartCountdownButton
            type="submit"
            disabled={isSubmitDisabled}
          >
            <PlayIcon size={24} />
            Começar
          </Styled.StartCountdownButton>
        )}
      </form>
    </Styled.HomeContainer>
  );
};
