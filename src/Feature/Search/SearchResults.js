import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from "@apollo/client";
import { USERS_NEXT_QUERY, USERS_BEFORE_QUERY } from './SearchQueries.js';

function SearchResults({ searchQuery, offset, after, before, onNextPage, onPreviousPage }) {
    const { loading, error, data } = useQuery(before === null ? USERS_NEXT_QUERY : USERS_BEFORE_QUERY, {
        variables: { searchQuery, after, before },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const edges = data.search.edges
    const userCount = data.search.userCount
    const hasNextPage = data.search.pageInfo?.hasNextPage ?? false
    const hasPreviousPage = data.search.pageInfo?.hasPreviousPage ?? false
    const previousCursor = data.search.pageInfo?.startCursor
    const nextCursor = data.search.pageInfo?.endCursor

    return (
        <div>
            <div>
                <h3 className="App-paragraph">
                    Found {userCount} result{userCount === 1 ? '' : 's'} for '{searchQuery}'
                </h3>
            </div>
            {edges.map(({ node }) => (
                <div key={ node?.id ?? uuidv4() }>
                    <p className="App-paragraph">
                        {node?.name ?? "--"} : {node?.login ?? "--"}
                    </p>
                </div>
            ))}
            <NextAndPreviousButtons 
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onNextPage={() => onNextPage(nextCursor)}
                onPreviousPage={() => onPreviousPage(previousCursor)}
            />
        </div>
    )
}

const NextAndPreviousButtons = ({ hasNextPage, hasPreviousPage, onNextPage, onPreviousPage }) => {
    return (
        <>
        {hasPreviousPage ? <button onClick={onPreviousPage}>Previous</button> : <></>}
        {hasNextPage ? <button onClick={onNextPage}>Next</button> : <></>}
        </>
    );
}

export default SearchResults;