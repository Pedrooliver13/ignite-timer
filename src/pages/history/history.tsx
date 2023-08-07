// Packages
import { ReactElement } from "react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

// Contexts
import { useCyclesContext } from "contexts/useCycleContext";

// Styles
import * as Styled from "./styles";

export const History = (): ReactElement => {
  const { cycles } = useCyclesContext();

  return (
    <Styled.HistoryContainer>
      <h1>Meu histórico</h1>

      <Styled.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minuto(s)</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Styled.Status statusColor="green">Concluído</Styled.Status>
                  )}
                  {cycle.interruptedDate && (
                    <Styled.Status statusColor="red">
                      Interrompido
                    </Styled.Status>
                  )}
                  {!cycle.interruptedDate && !cycle.interruptedDate && (
                    <Styled.Status statusColor="yellow">
                      Em andamento
                    </Styled.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Styled.HistoryList>
    </Styled.HistoryContainer>
  );
};
