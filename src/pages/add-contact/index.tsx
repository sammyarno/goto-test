import NavigationBar from "../../components/navigation-bar";
import { ActionButton, Container, MessageInfo } from "../../components/shared";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { NewContact } from "./types";
import { Input, RowInput, Title } from "./styles";
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

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (newContact.first_name && newContact.last_name && newContact.phones.length > 0) {
      await addContact(newContact);
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
        <ActionButton primary onClick={handleAddPhone}>
          Add Other Phone
        </ActionButton>
        <RowInput footer>
          {message?.text ? <MessageInfo type={message.type}>{message.text}</MessageInfo> : null}
          <ActionButton secondary onClick={() => navigate(-1)} disabled={postLoading}>
            BACK
          </ActionButton>
          <ActionButton thumbnail onClick={handleSave} disabled={postLoading}>
            SAVE
          </ActionButton>
        </RowInput>
      </Container>
    </Container>
  );
};

export default AddContact;
