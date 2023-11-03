/** @jsxImportSource @emotion/react */
import { MouseEvent, useEffect } from "react";
import { Container } from "../shared";
import { useContact } from "../../contexts/contact";
import { PaginationButton, PaginationContainer } from "./styles";
import Filter from "../filter";
import { CustomContact } from "../../contexts/types";
import { useNavigate } from "react-router-dom";
import Item from "./item";

const ContactList = () => {
  const navigate = useNavigate();
  const {
    getContacts,
    contacts,
    getLoading,
    handlePagination,
    params,
    deleteContact,
    handleSelectContact,
    handleToogleFavorite,
  } = useContact();

  const handlePaginationChange = (e: MouseEvent<HTMLButtonElement>, type = "") => {
    e.preventDefault();
    handlePagination(type);
  };

  const handleSearchFilter = (where: object) => {
    getContacts({
      ...params,
      where,
    });
  };

  const handleEditContact = (e: MouseEvent<HTMLButtonElement>, contact: CustomContact) => {
    e.preventDefault();
    handleSelectContact(contact);
    navigate("/edit");
  };

  const handleDeleteContact = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    deleteContact(id);
  };

  const handleFavoriteContact = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    handleToogleFavorite(id);
  };

  useEffect(() => {
    getContacts();
  }, []);

  if (getLoading) {
    return (
      <center>
        <h2>Loading your data...</h2>
      </center>
    );
  }

  if (contacts) {
    return (
      <Container padded>
        <Filter onSearch={handleSearchFilter} />
        <Container>
          {/* FAV CONTACTS */}
          {/* {Array.from(Array(5).keys()).map((val) => (
            <Contact key={val}>
              <div>
                <p css={contactNameStyle}>{val}</p>
                <p css={contactPhoneStyle}>087788030036</p>
                <ActionButton primary>edit</ActionButton>
                <ActionButton danger>delete</ActionButton>
              </div>
              <div>
                <ActionButton favorite>favorite</ActionButton>
              </div>
            </Contact>
          ))} */}
          {contacts.map((contact, index) => (
            <Item
              key={`${contact.id}|${index}`}
              contact={contact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onFavorite={handleFavoriteContact}
            />
          ))}
        </Container>
        <PaginationContainer>
          <PaginationButton disabled={params.offset === 0} onClick={(e) => handlePaginationChange(e, "PREV")}>
            prev
          </PaginationButton>
          <PaginationButton onClick={(e) => handlePaginationChange(e, "NEXT")}>next</PaginationButton>
        </PaginationContainer>
      </Container>
    );
  }

  return <></>;
};

export default ContactList;
