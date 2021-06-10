import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query($searchQuery:String!) {
    search(query: $searchQuery, type: USER, first: 10) {
        userCount
        edges {
            node {
                ... on User {
                    avatarUrl
                    url
                    name
                    login
                    id
                }
            }
        }
    }
  }
`;