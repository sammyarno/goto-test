/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container } from "../shared";
import styled from "@emotion/styled";

type ContactActionButtonProps = {
  danger?: boolean;
  primary?: boolean;
  info?: boolean;
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
  ${(props) => `${props.info ? "border: 1px solid rgba(204, 186, 49); color: rgba(204, 186, 49);" : ""}`}

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

const ContactList = () => {
  return (
    <Container padded>
      <Container>
        {Array.from(Array(5).keys()).map((val) => (
          <Contact key={val}>
            <div>
              <p css={contactNameStyle}>{val}</p>
              <p css={contactPhoneStyle}>087788030036</p>
              <ContactActionButton primary>edit</ContactActionButton>
              <ContactActionButton danger>delete</ContactActionButton>
            </div>
            <div>
              <ContactActionButton info>favorite</ContactActionButton>
            </div>
          </Contact>
        ))}
        {Array.from(Array(5).keys()).map((val) => (
          <Contact key={val}>
            <div>
              <p css={contactNameStyle}>{val}</p>
              <p css={contactPhoneStyle}>087788030036</p>
              <ContactActionButton primary>edit</ContactActionButton>
              <ContactActionButton danger>delete</ContactActionButton>
            </div>
            {/* <div>
              <ContactActionButton info>regular</ContactActionButton>
            </div> */}
          </Contact>
        ))}
      </Container>
      <PaginationContainer>
        <PaginationButton disabled>prev</PaginationButton>
        <PaginationButton>next</PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default ContactList;
