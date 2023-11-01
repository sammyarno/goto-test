/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Navbar = styled.div`
  border-bottom: 1px solid var(--accent);
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
`;

const logoStyle = css`
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavigationBar = () => {
  return (
    <Navbar>
      <h1 css={logoStyle}>Contact List</h1>
    </Navbar>
  );
};

export default NavigationBar;
