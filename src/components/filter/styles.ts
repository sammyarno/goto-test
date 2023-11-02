import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  background-color: var(--primary);
  padding: 0.25rem 0.75rem;
  text-transform: uppercase;
`;

export const SearchInput = styled.input`
  margin-right: 1rem;
  padding: 0.25rem 0.75rem;
  border: none;
  width: 300px;

  :focus {
    outline: none;
  }
`;

export const AddButton = styled.button`
  border-radius: 0.25rem;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border: none;
  background-color: var(--primary);
`;

export const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
