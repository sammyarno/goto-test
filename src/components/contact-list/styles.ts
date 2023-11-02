import styled from "@emotion/styled";
import { ContactActionButtonProps } from "./types";
import { css } from "@emotion/react";

export const Contact = styled.div`
  border-bottom: 1px solid gray;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const ContactActionButton = styled.button<ContactActionButtonProps>`
  padding: 0.25rem 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
  background-color: transparent;
  border: none;
  border-radius: 0.25rem;
  letter-spacing: 1px;

  ${(props) => `${props.primary ? "border: 1px solid var(--primary); color: var(--primary);" : ""}`}
  ${(props) => `${props.danger ? "border: 1px solid rgba(189, 42, 54); color: rgba(189, 42, 54);" : ""}`}
  
  ${(props) => `${props.favorite ? "border: 1px solid rgba(44, 150, 171); color: rgba(44, 150, 171);" : ""}`}
  ${(props) => `${props.regular ? "border: 1px solid dimgray; color: dimgray;" : ""}`}

  :not(:last-child) {
    margin-right: 1rem;
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
`;
