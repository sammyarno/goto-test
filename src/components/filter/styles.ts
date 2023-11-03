import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;
