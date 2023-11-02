/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MouseEvent, useEffect, useState } from "react";
import { Container } from "../shared";
import { Params } from "../../models/pagination";
import { useContact } from "../../contexts/contact";

type ContactActionButtonProps = {
  danger?: boolean;
  primary?: boolean;
  favorite?: boolean;
  regular?: boolean;
};

const Contact = styled.div`
  border-bottom: 1px solid gray;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaginationContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaginationButton = styled.button`
  margin: 0 0.75rem;
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  color: ${(props) => (props.disabled ? "gray" : "var(--accent)")};
  font-weight: bold;
  letter-spacing: 1px;

  :hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
`;

const ContactActionButton = styled.button<ContactActionButtonProps>`
  padding: 0.25rem 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
  background-color: transparent;
  border: none;
  border-radius: 0.25rem;
  letter-spacing: 1px;

  ${(props) => `${props.primary ? "border: 1px solid var(--primary); color: var(--primary);" : ""}`}
  ${(props) => `${props.danger ? "border: 1px solid rgba(189, 42, 54); color: rgba(189, 42, 54);" : ""}`}
  
  ${(props) => `${props.favorite ? "border: 1px solid rgba(44, 150, 171); color: rgba(44, 150, 171);" : ""}`}
  ${(props) => `${props.regular ? "border: 1px solid dimgray; color: dimgray;" : ""}`}

  :not(:last-child) {
    margin-right: 1rem;
  }
`;

const contactNameStyle = css`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--primary);
`;

const contactPhoneStyle = css`
  margin-bottom: 1rem;
`;

const defaultParams: Params = {
  offset: 0,
  limit: 10,
};

const Contacts = () => {
  const [params, setParams] = useState(defaultParams);
  const { getContacts, contacts, loading } = useContact();

  useEffect(() => {
    getContacts(defaultParams);
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
          <PaginationButton disabled onClick={(e) => handlePagination(e, "PREV")}>
            prev
          </PaginationButton>
          <PaginationButton onClick={(e) => handlePagination(e, "NEXT")}>next</PaginationButton>
        </PaginationContainer>
      </Container>
    );

  return <></>;
};

export default Contacts;
