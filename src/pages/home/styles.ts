// Packages
import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props): string => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props): string => props.theme["gray-100"]};

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props): string => props.theme["green-500"]};
  color: ${(props): string => props.theme["gray-100"]};

  &:not(:disabled):hover {
    background: ${(props): string => props.theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props): string => props.theme["red-500"]};

  &:not(:disabled):hover {
    background: ${(props): string => props.theme["red-700"]};
  }
`;
