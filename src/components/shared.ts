import styled from "@emotion/styled";
import { ActionButtonProps } from "./types";

type ContainerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  padded?: boolean;
  style?: string;
};

export const Container = styled.div<ContainerProps>`
  @media (max-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 577px) and (max-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 993px) and (max-width: 1200px) {
    max-width: 1140px;
  }

  @media (min-width: 1201px) {
    max-width: 1200px;
  }

  width: 100%;
  margin: 0 auto;

  ${(props) => `${props.padded ? "padding: 1rem 0;" : ""}`};
  ${(props) => `${props.style ? props.style : ""}`};
`;

export const ActionButton = styled.button<ActionButtonProps>`
  padding: 0.25rem 0.75rem;
  text-transform: capitalize;
  background-color: transparent;
  border: none;
  border-radius: 0.25rem;
  letter-spacing: 1px;
  cursor: pointer;

  ${(props) => `${props.primary ? "border: 1px solid var(--primary); color: var(--primary);" : ""}`}
  ${(props) => `${props.danger ? "border: 1px solid rgba(189, 42, 54); color: rgba(189, 42, 54);" : ""}`}
  
  ${(props) => `${props.favorite ? "border: 1px solid rgba(44, 150, 171); color: rgba(44, 150, 171);" : ""}`}
  ${(props) => `${props.regular ? "border: 1px solid dimgray; color: dimgray;" : ""}`}

  ${(props) =>
    `${props.thumbnail ? `text-transform: uppercase;background-color: var(--primary);font-weight: bold;` : ""}`}

  :not(:last-child) {
    margin-right: 1rem;
  }
`;
