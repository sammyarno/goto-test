import { createContext, useContext, useEffect, useState } from "react";
import { OperationVariables, useLazyQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../utils/queries";
import { Params } from "../models/request";
import { ContactContextType, ContactListResponse, CustomContact, Props } from "./types";

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
  const [contacts, setContacts] = useState<CustomContact[]>([]);
  const [getContacts, { loading, data }] = useLazyQuery<ContactListResponse, OperationVariables>(GET_CONTACT_LIST);

  const handleGetContacts = (params: Params) => {
    if (!params.where) {
      delete params.where;
    }

    getContacts({
      variables: params,
    });
  };

  const handleAddContact = (contact: CustomContact) => {
    console.log(contact);
    setContacts((prev) => [...prev, contact]);
  };

  useEffect(() => {
    if (data?.contact) {
      const tempContacts = data.contact.map((x) => ({
        ...x,
        isFav: false,
      }));

      setContacts([...tempContacts]);
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
