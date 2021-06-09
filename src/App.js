import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from "@apollo/client";

function App() {
  return (
    <div className="App">
      <Users searchQuery="example"/>
    </div>
  );
}

const USERS_QUERY = gql`
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

function Users({ searchQuery }) {
  const { loading, error, data } = useQuery(USERS_QUERY, {
    variables: { searchQuery },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.search.edges.map(({ node }) => (
    <div key={node.id}>
      <p className="App-paragraph">
        {node.name}: {node.login}
      </p>
    </div>
  ));
}

export default App;
