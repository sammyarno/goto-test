import styled from "@emotion/styled";
import { RowInputProps } from "./types";

export const Input = styled.input`
  margin-right: 1rem;
  padding: 0.25rem 0.75rem;
  border: none;
  width: 300px;

  :focus {
    outline: none;
  }
`;

export const RowInput = styled.div<RowInputProps>`
  margin: 1rem 0;

  ${(props) => `${props.footer ? "display: flex; justify-content: flex-end; gap: .5rem;" : ""}`}
`;

export const Title = styled.h3`
  margin-bottom: 0.75rem;
`;
