import NavigationBar from "../../components/navigation-bar";
import { ActionButton, Container, MessageInfo } from "../../components/shared";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { NewContact } from "./types";
import { Input, RowInput, Title } from "../../components/shared";
import { useContact } from "../../contexts/contact";
import { Message } from "../../models";
import { useNavigate, Navigate } from "react-router-dom";

const defaultPhone = {
  number: "",
};

const defaultNewContact: NewContact = {
  first_name: "",
  last_name: "",
  phones: [{ ...defaultPhone }],
};

const defaultMessage: Message = {
  text: "",
  type: "SUCCESS",
};

const EditContact = () => {
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState(defaultNewContact);
  const [message, setMessage] = useState(defaultMessage);
  const {
    updateLoading,
    updateContactResponse,
    updateContactReset,
    updateContactError,
    updateContact,
    selectedContact,
  } = useContact();

  const handleInputUpdate = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setNewContact((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let valid = true;
    let message = "";

    setMessage((prev) => ({
      ...prev,
      text: message,
      type: "DANGER",
    }));

    // check first name and last name
    if (!newContact.first_name || !newContact.last_name) {
      message = "First and last name must be filled";
    } else {
      const alphanumericRegex = new RegExp("^\\w+$");

      if (!alphanumericRegex.test(newContact.first_name) || !alphanumericRegex.test(newContact.last_name)) {
        valid = false;
        message = "Name must be alphanumeric characters only";
      }
    }

    if (valid) {
      updateContact(`${selectedContact!.id}`, newContact);
    } else {
      setMessage((prev) => ({
        ...prev,
        text: message,
        type: "DANGER",
      }));
    }
  };

  useEffect(() => {
    updateContactReset();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      setNewContact((prev) => ({
        ...prev,
        first_name: selectedContact.first_name,
        last_name: selectedContact.last_name,
        phones: selectedContact.phones.map((phone) => ({ number: phone.number })),
      }));
    }
  }, [selectedContact]);

  useEffect(() => {
    if (updateContactResponse) {
      setMessage((prev) => ({
        ...prev,
        text: `Success updating ${newContact.first_name} ${newContact.last_name}`,
        type: "SUCCESS",
      }));
    } else {
      setMessage({ ...defaultMessage });
    }
  }, [updateContactResponse]);

  useEffect(() => {
    if (updateContactError) {
      setMessage((prev) => ({
        ...prev,
        text: updateContactError.message || "",
        type: "DANGER",
      }));
    }
  }, [updateContactError]);

  if (!selectedContact) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container className="app">
      <NavigationBar />
      <Container padded>
        <RowInput>
          <Title>Info</Title>
          <Input
            type="text"
            placeholder="first name"
            value={newContact.first_name}
            onChange={(e) => handleInputUpdate(e, "first_name")}
            disabled={updateLoading}
          />
          <Input
            type="text"
            placeholder="last name"
            value={newContact.last_name}
            onChange={(e) => handleInputUpdate(e, "last_name")}
            disabled={updateLoading}
          />
        </RowInput>
        {newContact.phones.map((phone, index) => (
          <RowInput key={index}>
            <Title>Phone #{index + 1}</Title>
            <Input type="text" placeholder="phone number" value={phone.number} disabled />
          </RowInput>
        ))}
        <RowInput footer>
          {message?.text ? <MessageInfo type={message.type}>{message.text}</MessageInfo> : null}
          <div>
            <ActionButton secondary onClick={() => navigate(-1)} disabled={updateLoading}>
              BACK
            </ActionButton>
            <ActionButton thumbnail onClick={handleSave} disabled={updateLoading}>
              SAVE
            </ActionButton>
          </div>
        </RowInput>
      </Container>
    </Container>
  );
};

export default EditContact;
