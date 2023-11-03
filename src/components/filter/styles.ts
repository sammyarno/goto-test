import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    margin-bottom: 1rem;
  }
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

export const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;
