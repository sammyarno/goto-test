import NavigationBar from "../../components/navigation-bar";
import { ActionButton, Container } from "../../components/shared";
import { ChangeEvent, MouseEvent, useState } from "react";
import { NewContact } from "./types";
import { Input, RowInput, Title } from "./styles";

const defaultPhone = {
  number: "",
};

const defaultNewContact: NewContact = {
  first_name: "",
  last_name: "",
  phones: [{ ...defaultPhone }],
};

const AddContact = () => {
  const [newContact, setNewContact] = useState(defaultNewContact);

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

    console.log(newContact);
  };

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
          />
          <Input
            type="text"
            placeholder="last name"
            value={newContact.last_name}
            onChange={(e) => handleInputUpdate(e, "last_name")}
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
            />
            <ActionButton danger onClick={(e) => handleRemovePhone(e, index)}>
              delete
            </ActionButton>
          </RowInput>
        ))}
        <ActionButton primary onClick={handleAddPhone}>
          Add Other Phone
        </ActionButton>
        <RowInput footer>
          <ActionButton thumbnail onClick={handleSave}>
            SAVE
          </ActionButton>
        </RowInput>
      </Container>
    </Container>
  );
};

export default AddContact;
