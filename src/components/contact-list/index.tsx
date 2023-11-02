/** @jsxImportSource @emotion/react */
import { MouseEvent, useEffect, useState } from "react";
import { Container } from "../shared";
import { Params } from "../../models/pagination";
import { useContact } from "../../contexts/contact";
import {
  Contact,
  ContactActionButton,
  PaginationButton,
  PaginationContainer,
  contactNameStyle,
  contactPhoneStyle,
} from "./styles";

const defaultParams: Params = {
  offset: 0,
  limit: 10,
};

const defaultPaginationStatus = {
  ablePrev: false,
  ableNext: true,
};

const Contacts = () => {
  const [params, setParams] = useState(defaultParams);
  const [paginationStatus, setPaginationStatus] = useState(defaultPaginationStatus);
  const { getContacts, contacts, loading } = useContact();

  useEffect(() => {
    getContacts(defaultParams);
    setPaginationStatus(defaultPaginationStatus);
  }, []);

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

  if (loading) return <h2>Loading your data...</h2>;

  if (contacts)
    return (
      <Container padded>
        <Container>
          {/* FAV CONTACTS */}
          {/* {Array.from(Array(5).keys()).map((val) => (
            <Contact key={val}>
              <div>
                <p css={contactNameStyle}>{val}</p>
                <p css={contactPhoneStyle}>087788030036</p>
                <ContactActionButton primary>edit</ContactActionButton>
                <ContactActionButton danger>delete</ContactActionButton>
              </div>
              <div>
                <ContactActionButton favorite>favorite</ContactActionButton>
              </div>
            </Contact>
          ))} */}
          {contacts.map((contact) => (
            <Contact key={contact.id}>
              <div>
                <p css={contactNameStyle}>{`${contact.first_name} ${contact.last_name}`}</p>
                <p css={contactPhoneStyle}>{contact.phones[0].number}</p>
                <ContactActionButton primary>edit</ContactActionButton>
                <ContactActionButton danger>delete</ContactActionButton>
              </div>
              <div>
                <ContactActionButton regular>regular</ContactActionButton>
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

export default Contacts;
