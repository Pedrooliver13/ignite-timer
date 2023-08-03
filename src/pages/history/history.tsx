// Packages
import { ReactElement } from "react";

// Contexts
import { useCyclesContext } from "contexts/useCycleContext";

// Styles
import * as Styled from "./styles";

export const History = (): ReactElement => {
  const { activeCycle } = useCyclesContext();

  return (
    <Styled.HistoryContainer>
      <h1>Meu histórico</h1>

      <div>{JSON.stringify(activeCycle)}</div>

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
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Styled.Status statusColor="yellow">Concluído</Styled.Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Styled.Status statusColor="yellow">Concluído</Styled.Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Styled.Status statusColor="yellow">Concluído</Styled.Status>
              </td>
            </tr>
          </tbody>
        </table>
      </Styled.HistoryList>
    </Styled.HistoryContainer>
  );
};
