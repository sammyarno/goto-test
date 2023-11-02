import { ApolloError } from "@apollo/client";
import { Contact } from "../models/contact";
import { Params } from "../models/request";
import { NewContact } from "../pages/add-contact/types";

export type ContactContextType = {
  contacts: CustomContact[];
  addContactResponse: unknown;
  addContactError: ApolloError | undefined;
  addContactReset: () => void;
  getLoading: boolean;
  postLoading: boolean;
  addContact: (contact: NewContact) => void;
  getContacts: (params: Params) => void;
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
