/** @jsxImportSource @emotion/react */
import { ChangeEvent, MouseEvent, useState } from "react";
import { ActionButton, Input, RowInput } from "../shared";
import { containerStyle } from "./styles";
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
    <div css={containerStyle}>
      <RowInput>
        <Input type="text" value={searchQuery} onChange={handleSearchQuery} placeholder="search by first name" />
        <ActionButton primary onClick={handleSearch}>
          search
        </ActionButton>
      </RowInput>
      <RowInput>
        <ActionButton thumbnail onClick={() => navigate("/add")}>
          add contact
        </ActionButton>
      </RowInput>
    </div>
  );
};

export default Filter;
