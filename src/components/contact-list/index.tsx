/** @jsxImportSource @emotion/react */
import { MouseEvent, useEffect, useState } from "react";
import { ActionButton, Container } from "../shared";
import { Params } from "../../models/request";
import { useContact } from "../../contexts/contact";
import { Contact, PaginationButton, PaginationContainer, contactNameStyle, contactPhoneStyle } from "./styles";
import Filter from "../filter";

const defaultParams: Params = {
  offset: 0,
  limit: 10,
  where: null,
};

const defaultPaginationStatus = {
  ablePrev: false,
  ableNext: true,
};

const ContactList = () => {
  const [params, setParams] = useState(defaultParams);
  const [paginationStatus, setPaginationStatus] = useState(defaultPaginationStatus);
  const { getContacts, contacts, loading } = useContact();

  const getList = (newParams = {}) => {
    const tempParams = {
      ...params,
      ...newParams,
    };

    getContacts(tempParams);

    setParams((prev) => ({ ...prev, ...tempParams }));
    setPaginationStatus(defaultPaginationStatus);
  };

  const handlePagination = (e: MouseEvent<HTMLButtonElement>, type = "") => {
    e.preventDefault();
    let newOffset = 0;

    switch (type) {
      case "NEXT":
        newOffset = params.offset + params.limit;
        break;
      case "PREV":
        newOffset = params.offset - params.limit;

        if (newOffset < 0) {
          newOffset = 0;
        }
        break;
      default:
        break;
    }

    setParams((prev) => ({
      ...prev,
      offset: newOffset,
    }));
  };

  useEffect(() => {
    getList();
  }, []);

  if (loading)
    return (
      <center>
        <h2>Loading your data...</h2>
      </center>
    );

  if (contacts)
    return (
      <Container padded>
        <Filter onSearch={getList} />
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
                <ActionButton primary>edit</ActionButton>
                <ActionButton danger>delete</ActionButton>
              </div>
              <div>
                <ActionButton regular>regular</ActionButton>
              </div>
            </Contact>
          ))}
        </Container>
        <PaginationContainer>
          <PaginationButton disabled={!paginationStatus.ablePrev} onClick={(e) => handlePagination(e, "PREV")}>
            prev
          </PaginationButton>
          <PaginationButton disabled={!paginationStatus.ableNext} onClick={(e) => handlePagination(e, "NEXT")}>
            next
          </PaginationButton>
        </PaginationContainer>
      </Container>
    );

  return <></>;
};

export default ContactList;
