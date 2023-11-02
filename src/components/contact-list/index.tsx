/** @jsxImportSource @emotion/react */
import { MouseEvent, useEffect } from "react";
import { ActionButton, Container } from "../shared";
import { useContact } from "../../contexts/contact";
import { Contact, PaginationButton, PaginationContainer, contactNameStyle, contactPhoneStyle } from "./styles";
import Filter from "../filter";
import { CustomContact } from "../../contexts/types";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const navigate = useNavigate();
  const {
    getContacts,
    contacts,
    getLoading,
    handlePagination,
    params,
    deleteContact,
    deleteLoading,
    handleSelectContact,
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

  const actionLoading = deleteLoading;

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
            <Contact key={`${contact.id}|${index}`}>
              <div>
                <p css={contactNameStyle}>{`${contact.first_name} ${contact.last_name}`}</p>
                <p css={contactPhoneStyle}>{contact.phones.map((phone) => phone.number).join(" / ")}</p>
                <ActionButton primary disabled={actionLoading} onClick={(e) => handleEditContact(e, contact)}>
                  edit
                </ActionButton>
                <ActionButton danger disabled={actionLoading} onClick={(e) => handleDeleteContact(e, `${contact.id}`)}>
                  delete
                </ActionButton>
              </div>
              <div>
                <ActionButton secondary>regular</ActionButton>
              </div>
            </Contact>
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
