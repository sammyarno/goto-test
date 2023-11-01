import styled from "@emotion/styled";

const Container = styled.div`
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
`;

const App = () => {
  return (
    <Container className="app">
      <h1>Test Index</h1>
    </Container>
  );
};

export default App;
