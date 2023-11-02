/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Navbar>
      <h1 css={logoStyle} onClick={() => navigate("/")}>
        Contact List
      </h1>
    </Navbar>
  );
};

export default NavigationBar;
