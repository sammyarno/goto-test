import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Navbar = styled.div`
  border-bottom: 1px solid var(--accent);
  padding: 1rem 0;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const logoStyle = css`
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
`;
