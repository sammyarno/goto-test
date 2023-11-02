import { createContext, useContext, useEffect, useState } from "react";
import { Contact } from "../models/contact";
import { OperationVariables, useLazyQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../utils/queries";
import { Params } from "../models/pagination";

type ContactContextType = {
  contacts: Contact[];
  loading: boolean;
  addContact: (contact: Contact) => void;
  getContacts: (params: Params) => void;
};

type ContactListResponse = {
  contact: Contact[];
};

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const ContactContext = createContext<ContactContextType | null>(null);

export const useContact = () => {
  const ctx = useContext(ContactContext);

  if (!ctx) {
    throw new Error("useContact must be used within the ContactProvider");
  }

  return ctx;
};

const ContactProvider = (props: Props) => {
  const { children } = props;
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [getContacts, { loading, data }] = useLazyQuery<ContactListResponse, OperationVariables>(GET_CONTACT_LIST);

  const handleGetContacts = (params: Params) => {
    getContacts({
      variables: params,
    });
  };

  const handleAddContact = (contact: Contact) => {
    console.log(contact);
    setContacts((prev) => [...prev, contact]);
  };

  useEffect(() => {
    if (data?.contact) {
      setContacts((prev) => [...prev, ...data.contact]);
    }
  }, [data]);

  const value = {
    contacts,
    loading,
    addContact: handleAddContact,
    getContacts: handleGetContacts,
  };

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

export default ContactProvider;
