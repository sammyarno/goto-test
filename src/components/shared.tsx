import styled from "@emotion/styled";

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
