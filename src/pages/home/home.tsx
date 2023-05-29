// Packages
import { ReactElement } from 'react';
import { Play as PlayIcon } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Styles
import * as Styled from './styles';

const newCircleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

export const Home = (): ReactElement => {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCircleFormValidationSchema),
  });

  const taskInputValue = watch('task');

  const isSubmitDisabled = !taskInputValue;

  const handleCreateNewTimer = (data: any) => {
    console.log('data', data);
  };

  return (
    <Styled.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTimer)}>
        <Styled.FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <Styled.TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
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
            {...register('minutesAmount')}
          />

          <span>minutos.</span>
        </Styled.FormContainer>

        <Styled.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Styled.Separator>:</Styled.Separator>
          <span>0</span>
          <span>0</span>
        </Styled.CountdownContainer>

        <Styled.StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <PlayIcon size={24} />
          Começar
        </Styled.StartCountdownButton>
      </form>
    </Styled.HomeContainer>
  );
};
