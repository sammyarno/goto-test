/** @jsxImportSource @emotion/react */
import { ChangeEvent, MouseEvent, useState } from "react";
import { Container } from "../shared";
import { AddButton, InputContainer, SearchButton, SearchInput, containerStyle } from "./styles";
import { Props } from "./types";

const Filter = (props: Props) => {
  const { onSearch } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch({
      where: {
        first_name: { _like: `%${searchQuery}%` },
      },
    });
  };

  return (
    <Container padded css={containerStyle}>
      <InputContainer>
        <SearchInput type="text" value={searchQuery} onChange={handleSearchQuery} />
        <SearchButton onClick={handleSearch}>search</SearchButton>
      </InputContainer>
      <AddButton>add contact</AddButton>
    </Container>
  );
};

export default Filter;
