import styled from "@emotion/styled";
import { ActionButtonProps, ContainerProps, MessageInfoProps, RowInputProps } from "./types";

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
  ${(props) => `${props.secondary ? "border: 1px solid dimgray; color: dimgray;" : ""}`}
  ${(props) => `${props.danger ? "border: 1px solid rgba(189, 42, 54); color: rgba(189, 42, 54);" : ""}`}
  ${(props) => `${props.info ? "border: 1px solid rgba(240, 212, 74); color: rgba(240, 212, 74);" : ""}`}

  ${(props) =>
    `${props.thumbnail ? `text-transform: uppercase;background-color: var(--primary);font-weight: bold;` : ""}`}

  :not(:last-child) {
    margin-right: 1rem;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;

    ${(props) => `${props.small ? "width: auto;" : ""}`}

    :not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`;

export const MessageInfo = styled.span<MessageInfoProps>`
  border-radius: 0.25rem;
  margin-right: 1rem;
  padding: 0.25rem 0.75rem;

  ${(props) =>
    `${
      props.type === "DANGER"
        ? `
    background-color: rgba(189, 42, 54, 0.3);
    border: 1px solid rgba(189, 42, 54, 0.8);
    color: rgba(189, 42, 54);
  `
        : ""
    }`};

  ${(props) =>
    `${
      props.type === "SUCCESS"
        ? `
    background-color: rgba(50, 168, 82, 0.3);
    border: 1px solid rgba(50, 168, 82, 0.8);
    color: rgba(50, 168, 82);
  `
        : ""
    }`};

  @media (max-width: 576px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

export const Input = styled.input`
  margin-right: 1rem;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  width: 300px;

  :focus {
    outline: none;
  }

  :disabled {
    color: white;
  }

  @media (max-width: 576px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;

    padding: 0.75rem;
  }
`;

export const RowInput = styled.div<RowInputProps>`
  margin: 1rem 0;

  ${(props) =>
    `${
      props.footer
        ? `
    display: flex; 
    align-items: center; 
    justify-content: flex-end; 
    gap: .5rem;

    @media (max-width: 576px) {
      flex-direction: column;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }
  `
        : ""
    }`}

  @media (max-width: 576px) {
    margin: 0.75rm 0;
    padding: 0 0.5rem;
    width: 100%;
  }
`;

export const Title = styled.h3`
  margin-bottom: 0.75rem;
`;
