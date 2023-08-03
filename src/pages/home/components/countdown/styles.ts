// Packages
import styled from "styled-components";

export const CountdownContainer = styled.div`
  display: flex;
  gap: 1rem;

  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props): string => props.theme["gray-100"]};

  span {
    background: ${(props): string => props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  width: 4rem;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  color: ${(props): string => props.theme["green-500"]};
  overflow: hidden;
`;
