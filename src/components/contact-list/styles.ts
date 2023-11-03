import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Contact = styled.div`
  border-bottom: 1px solid gray;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:first-child {
    width: 80%;
  }

  @media (max-width: 576px) {
    padding: 0.75rem;
    flex-direction: column;
    gap: 0.75rem;

    div:first-child {
      width: 100%;
    }
  }
`;

export const PaginationContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginationButton = styled.button`
  margin: 0 0.75rem;
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  color: ${(props) => (props.disabled ? "gray" : "var(--accent)")};
  font-weight: bold;
  letter-spacing: 1px;

  :hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

export const contactNameStyle = css`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: var(--primary);
`;

export const contactPhoneStyle = css`
  margin-bottom: 1rem;
  overflow-wrap: break-word;
`;
