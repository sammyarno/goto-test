/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Container } from "../shared";
import { css } from "@emotion/react";

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 300px;

  :focus {
    outline: none;
  }
`;

const AddButton = styled.button`
  border-radius: 0.25rem;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border: none;
  background-color: var(--primary);
`;

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Filter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(`search ${searchQuery}`);
  };

  return (
    <Container padded css={containerStyle}>
      <InputContainer>
        <SearchInput type="text" value={searchQuery} onChange={handleSearchQuery} />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </InputContainer>
      <AddButton>add contact</AddButton>
    </Container>
  );
};

export default Filter;
