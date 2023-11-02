import { createContext, useContext, useEffect, useState } from "react";
import { OperationVariables, useLazyQuery, useMutation } from "@apollo/client";
import { ADD_CONTACT, DELETE_CONTACT, GET_CONTACT_LIST } from "../utils/queries";
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

const defaultParams: Params = {
  offset: 0,
  limit: 10,
  where: null,
};

const ContactProvider = (props: Props) => {
  const { children } = props;
  const [params, setParams] = useState<Params>(defaultParams);
  const [contacts, setContacts] = useState<CustomContact[]>([]);
  const [getContacts, { loading: getLoading, data, refetch: refetchContacts }] = useLazyQuery<
    ContactListResponse,
    OperationVariables
  >(GET_CONTACT_LIST);
  const [
    addContact,
    { data: addContactResponse, loading: postLoading, error: addContactError, reset: addContactReset },
  ] = useMutation(ADD_CONTACT);
  const [deleteContact, { loading: deleteLoading }] = useMutation(DELETE_CONTACT);

  const handlePagination = (type = "") => {
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

    handleGetContacts({
      ...params,
      offset: newOffset,
    });
  };

  const handleGetContacts = (newParams?: Params) => {
    const tempParams = {
      ...params,
      ...newParams,
    };

    if (!tempParams.where) {
      delete tempParams.where;
    }

    getContacts({
      variables: {
        ...tempParams,
        order_by: { created_at: "desc" },
      },
    });

    setParams((prev) => ({ ...prev, ...tempParams }));
  };

  const handleAddContact = (contact: NewContact) => {
    addContact({
      variables: contact,
    });
  };

  const handleDeleteContact = (id: string) => {
    deleteContact({
      variables: {
        id,
      },
      onCompleted: () => refetchContacts({ ...params }),
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
    params,
    handlePagination,
    addContact: handleAddContact,
    postLoading,
    addContactResponse,
    addContactError,
    addContactReset,
    deleteContact: handleDeleteContact,
    deleteLoading,
  };

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

export default ContactProvider;
