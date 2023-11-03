import NavigationBar from "../../components/navigation-bar";
import { ActionButton, Container, MessageInfo } from "../../components/shared";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { NewContact } from "./types";
import { Input, RowInput, Title } from "../../components/shared";
import { useContact } from "../../contexts/contact";
import { Message } from "../../models";
import { useNavigate } from "react-router-dom";

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

const AddContact = () => {
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState(defaultNewContact);
  const [message, setMessage] = useState(defaultMessage);
  const { postLoading, addContact, addContactError, addContactReset, addContactResponse } = useContact();

  const handleInputUpdate = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setNewContact((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const tempPhones = newContact.phones;
    const selectedPhoneObj = tempPhones[index];
    selectedPhoneObj.number = e.target.value;

    tempPhones.splice(index, 1, selectedPhoneObj);

    setNewContact((prev) => ({
      ...prev,
      phones: tempPhones,
    }));
  };

  const handleAddPhone = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setNewContact((prev) => ({
      ...prev,
      phones: [...prev.phones, { ...defaultPhone }],
    }));
  };

  const handleRemovePhone = (e: MouseEvent<HTMLButtonElement>, selectedIndex: number) => {
    e.preventDefault();
    setNewContact((prev) => ({
      ...prev,
      phones: prev.phones.filter((_, index) => index !== selectedIndex),
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

      console.log(newContact.first_name, alphanumericRegex.test(newContact.first_name));

      if (!alphanumericRegex.test(newContact.first_name) || !alphanumericRegex.test(newContact.last_name)) {
        valid = false;
        message = "Name must be alphanumeric characters only";
      }
    }

    if (valid) {
      addContact(newContact);
    } else {
      setMessage((prev) => ({
        ...prev,
        text: message,
        type: "DANGER",
      }));
    }
  };

  useEffect(() => {
    addContactReset();
  }, []);

  useEffect(() => {
    if (addContactResponse) {
      setMessage((prev) => ({
        ...prev,
        text: `Success adding ${newContact.first_name} ${newContact.last_name}`,
        type: "SUCCESS",
      }));

      setNewContact({ ...defaultNewContact });
    } else {
      setMessage({ ...defaultMessage });
    }
  }, [addContactResponse]);

  useEffect(() => {
    if (addContactError) {
      setMessage((prev) => ({
        ...prev,
        text: addContactError.message || "",
        type: "DANGER",
      }));
    }
  }, [addContactError]);

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
            disabled={postLoading}
          />
          <Input
            type="text"
            placeholder="last name"
            value={newContact.last_name}
            onChange={(e) => handleInputUpdate(e, "last_name")}
            disabled={postLoading}
          />
        </RowInput>
        {newContact.phones.map((phone, index) => (
          <RowInput key={index}>
            <Title>Phone #{index + 1}</Title>
            <Input
              type="text"
              placeholder="phone number"
              value={phone.number}
              onChange={(e) => handlePhoneChange(e, index)}
              disabled={postLoading}
            />
            {newContact.phones.length > 1 && index !== 0 ? (
              <ActionButton danger onClick={(e) => handleRemovePhone(e, index)}>
                delete
              </ActionButton>
            ) : null}
          </RowInput>
        ))}
        <RowInput>
          <ActionButton primary onClick={handleAddPhone}>
            Add Other Phone
          </ActionButton>
        </RowInput>
        <RowInput footer>
          {message?.text ? <MessageInfo type={message.type}>{message.text}</MessageInfo> : null}
          <div>
            <ActionButton secondary onClick={() => navigate(-1)} disabled={postLoading}>
              BACK
            </ActionButton>
            <ActionButton thumbnail onClick={handleSave} disabled={postLoading}>
              SAVE
            </ActionButton>
          </div>
        </RowInput>
      </Container>
    </Container>
  );
};

export default AddContact;
