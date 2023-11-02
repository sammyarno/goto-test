/** @jsxImportSource @emotion/react */
import { ChangeEvent, MouseEvent, useState } from "react";
import { ActionButton, Container } from "../shared";
import { InputContainer, SearchInput, containerStyle } from "./styles";
import { Props } from "./types";
import { useNavigate } from "react-router-dom";

const Filter = (props: Props) => {
  const { onSearch } = props;
  const navigate = useNavigate();
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
        <SearchInput type="text" value={searchQuery} onChange={handleSearchQuery} placeholder="search by first name" />
        <ActionButton primary onClick={handleSearch}>
          search
        </ActionButton>
      </InputContainer>
      <ActionButton thumbnail onClick={() => navigate("/add")}>
        add contact
      </ActionButton>
    </Container>
  );
};

export default Filter;
