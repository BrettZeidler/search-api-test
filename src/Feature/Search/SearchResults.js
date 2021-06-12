import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { People, Star, GeoAlt, ChevronLeft, ChevronRight, Link } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from "@apollo/client";
import { USERS_NEXT_QUERY, USERS_BEFORE_QUERY } from './SearchQueries.js';

function SearchResults({ searchQuery, after, before, onNextPage, onPreviousPage }) {
    const { loading, error, data } = useQuery(before === null ? USERS_NEXT_QUERY : USERS_BEFORE_QUERY, {
        variables: { searchQuery, after, before },
    });

    if (loading) return <Spinner className="Spinner-custom" animation="border"/>;
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
            <ListGroup>
            {edges.map(({ node }) => (
                <ListGroup.Item key={ node?.id ?? uuidv4() } className="User-Results">
                    <Row>
                    <Col xs="auto"><Image width={128} height={128} src={node?.avatarUrl} roundedCircle /></Col>
                    <Col >
                        <Row xs="auto">
                            <a className="User-link" href={node?.url}>{node?.name ?? "--"}</a> · {node?.login ?? "--"}
                        </Row>
                        <Row>
                            {node?.bio}
                        </Row>
                        <Row xs="auto">
                            <People className="User-stats-icons" size={20}/>{node?.followers?.totalCount ?? 0} · {node?.following?.totalCount ?? 0} following ·<a style={{ padding: '2px' }}></a><Star className="User-stats-icons" size={20}/>{node?.starredRepositories?.totalCount ?? 0}
                        </Row>
                        <Row xs="auto">
                            <GeoAlt className="User-stats-icons" size={node?.location ? 20 : 0}/>{node?.location}
                        </Row>
                        <Row xs="auto">
                            <Link className="User-stats-icons" size={node?.websiteUrl ? 20 : 0}/>
                            <a className="User-link" href={node?.websiteUrl}>{node?.websiteUrl}</a>
                        </Row>
                    </Col>
                    </Row>
                </ListGroup.Item>
            ))}
            </ListGroup>
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
        <div className="Pagination-buttons">
            {hasPreviousPage ? <Button className="Pagination-button" onClick={onPreviousPage}><ChevronLeft size={24}></ChevronLeft></Button> : <></>}
            {hasNextPage ? <Button className="Pagination-button" onClick={onNextPage}><ChevronRight size={24}></ChevronRight></Button> : <></>}
        </div>
    );
}

export default SearchResults;