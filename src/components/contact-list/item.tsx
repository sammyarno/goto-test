/** @jsxImportSource @emotion/react */
import { MouseEvent } from "react";
import { useContact } from "../../contexts/contact";
import { CustomContact } from "../../contexts/types";
import { ActionButton, RowInput } from "../shared";
import { Contact, contactNameStyle, contactPhoneStyle } from "./styles";

type Props = {
  contact: CustomContact;
  onEdit: (e: MouseEvent<HTMLButtonElement>, contact: CustomContact) => void;
  onDelete: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
};

const Item = (props: Props) => {
  const { contact, onDelete, onEdit } = props;
  const { deleteLoading } = useContact();

  const actionLoading = deleteLoading;

  return (
    <Contact>
      <div>
        <p css={contactNameStyle}>{`${contact.first_name} ${contact.last_name}`}</p>
        <p css={contactPhoneStyle}>{contact.phones.map((phone) => phone.number).join(" / ")}</p>
        <RowInput>
          <ActionButton danger disabled={actionLoading} onClick={(e) => onDelete(e, `${contact.id}`)}>
            delete
          </ActionButton>
          <ActionButton primary disabled={actionLoading} onClick={(e) => onEdit(e, contact)}>
            edit
          </ActionButton>
        </RowInput>
      </div>
      <ActionButton secondary>regular</ActionButton>
    </Contact>
  );
};

export default Item;
