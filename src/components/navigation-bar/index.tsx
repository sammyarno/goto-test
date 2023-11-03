/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { Navbar, logoStyle } from "./styles";

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
