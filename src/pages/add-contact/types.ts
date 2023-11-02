export type NewContact = {
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
};

export type RowInputProps = {
  footer?: boolean;
};
