/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ChangeEvent, MouseEvent, useState } from "react";

const Navbar = styled.div`
  border-bottom: 1px solid var(--accent);
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
`;

const SearchButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  background-color: var(--primary);
  padding: 0.25rem 0.75rem;
`;

const SearchInput = styled.input`
  margin-right: 1rem;
  padding: 0.25rem 0.75rem;
  border: none;

  :focus {
    outline: none;
  }
`;

const logoStyle = css`
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavigationBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(`search ${searchQuery}`);
  };

  return (
    <Navbar>
      <h2 css={logoStyle}>Contact List</h2>
      <div>
        <SearchInput type="text" value={searchQuery} onChange={handleSearchQuery} />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
