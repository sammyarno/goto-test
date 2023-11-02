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
        phones {
          number
        }
      }
    }
  }
`;
