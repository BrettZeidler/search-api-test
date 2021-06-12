import { gql } from "@apollo/client";

const USER_FIELDS = gql`
    fragment UserFields on User {
        avatarUrl
        bio
        id
        location
        login
        name
        url
        websiteUrl
        followers {
            totalCount
        }
        following {
            totalCount
        }
        starredRepositories {
            totalCount
        }
    }
`;

export const USERS_NEXT_QUERY = gql`
    ${USER_FIELDS}
    query($searchQuery:String!, $after:String) {
        search(query: $searchQuery, after: $after, type: USER, first: 10) {
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
            userCount
            edges {
                node {
                    ...UserFields
                }
            }
        }
    }
`;

export const USERS_BEFORE_QUERY = gql`
    ${USER_FIELDS}
    query($searchQuery:String!, $before:String) {
        search(query: $searchQuery, before: $before, type: USER, last: 10) {
            pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
            userCount
            edges {
                node {
                    ...UserFields
                }
            }
        }
    }
`;