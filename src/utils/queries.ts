import { gql } from "@apollo/client";

export const GET_CONTACT_LIST = gql`
  query GetContactList($limit: Int, $offset: Int, $where: contact_bool_exp, $order_by: [contact_order_by!]) {
    contact(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      created_at
      updated_at
      first_name
      id
      last_name
      phones {
        id
        number
      }
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation AddContactWithPhones($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {
    insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {
      returning {
        first_name
        last_name
        id
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContactWithId($id: Int!) {
    delete_contact_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
    }
  }
`;

export const UPDATE_CONTACT_PHONE = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
        }
      }
    }
  }
`;
