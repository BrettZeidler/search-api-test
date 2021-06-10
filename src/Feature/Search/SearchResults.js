import { v4 as uuidv4 } from 'uuid';
import { useQuery } from "@apollo/client";
import { USERS_QUERY } from './SearchQueries.js';

function SearchResults({ searchQuery }) {
    const { loading, error, data } = useQuery(USERS_QUERY, {
        variables: { searchQuery },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <div>
                <h3 className="App-paragraph">
                    Found {data.search.userCount ?? "no"} results for '{searchQuery}'
                </h3>
            </div>
            {data.search.edges.map(({ node }) => (
                <div key={ node?.id ?? uuidv4() }>
                    <p className="App-paragraph">
                        {node?.name ?? "--"} : {node?.login ?? "--"}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default SearchResults;