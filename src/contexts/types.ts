import { ApolloError } from "@apollo/client";
import { Contact } from "../models/contact";
import { Params } from "../models/request";
import { NewContact } from "../pages/add-contact/types";

export type ContactContextType = {
  getContacts: (params?: Params) => void;
  getLoading: boolean;
  contacts: CustomContact[];
  params: Params;
  handlePagination: (type: string) => void;
  addContact: (contact: NewContact) => void;
  postLoading: boolean;
  addContactResponse: unknown;
  addContactError: ApolloError | undefined;
  addContactReset: () => void;
  deleteContact: (id: string) => void;
  deleteLoading: boolean;
  updateContact: (id: string, contact: NewContact) => void;
  updateLoading: boolean;
  updateContactResponse: unknown;
  updateContactError: ApolloError | undefined;
  updateContactReset: () => void;
  selectedContact: Contact | null;
  handleSelectContact: (contact: Contact) => void;
  handleToogleFavorite: (id: string) => void;
};

export type CustomContact = Contact & {
  isFav: boolean;
};

export type ContactListResponse = {
  contact: CustomContact[];
};

export type Props = {
  children?: JSX.Element | JSX.Element[];
};
