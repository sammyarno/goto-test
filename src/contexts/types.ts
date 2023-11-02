import { Contact } from "../models/contact";
import { Params } from "../models/request";

export type ContactContextType = {
  contacts: CustomContact[];
  loading: boolean;
  addContact: (contact: CustomContact) => void;
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
