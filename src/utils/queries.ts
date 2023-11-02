import { gql } from "@apollo/client";

export const GET_CONTACT_LIST = gql`
  query GetContactList($limit: Int, $offset: Int) {
    contact(limit: $limit, offset: $offset) {
      created_at
      updated_at
      first_name
      id
      last_name
      phones {
        id
        contact_id
        created_ad
        number
      }
    }
  }
`;
