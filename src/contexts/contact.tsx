import { createContext, useContext, useEffect, useState } from "react";
import { OperationVariables, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_CONTACT, GET_CONTACT_LIST } from "../utils/queries";
import { Params } from "../models/request";
import { ContactContextType, ContactListResponse, CustomContact, Props } from "./types";
import { NewContact } from "../pages/add-contact/types";

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
  const [getContacts, { loading: getLoading, data }] = useLazyQuery<ContactListResponse, OperationVariables>(
    GET_CONTACT_LIST,
  );
  const [
    addContact,
    { data: addContactResponse, loading: postLoading, error: addContactError, reset: addContactReset },
  ] = useMutation(ADD_CONTACT);

  const handleGetContacts = (params: Params) => {
    if (!params.where) {
      delete params.where;
    }

    getContacts({
      variables: {
        ...params,
        order_by: { created_at: "desc" },
      },
    });
  };

  const handleAddContact = (contact: NewContact) => {
    addContact({
      variables: contact,
    });
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
    getContacts: handleGetContacts,
    getLoading,
    contacts,
    addContact: handleAddContact,
    addContactResponse,
    addContactError,
    addContactReset,
    postLoading,
  };

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

export default ContactProvider;
