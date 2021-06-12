import React from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

var searchTextValue = ''
var afterCursor = null
var beforeCursor = null

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paginationCount: 1,
            searchText: ''
        };
    }
  
    render() {
        return (
            <div>
                <SearchBar 
                    value={searchTextValue} 
                    onChange={this.onChange} 
                    onClick={this.onClick} 
                    onKeyDown={this.onKeyDown} 
                />
                <SearchResults
                    searchQuery={this.state.searchText}
                    offset={this.state.paginationCount - 1}
                    after={afterCursor}
                    before={beforeCursor}
                    onNextPage={this.onNextPage}
                    onPreviousPage={this.onPreviousPage}
                />
            </div>
        );
    }

    onChange = (event) => {
        searchTextValue = event.target.value;
    }

    onClick = () => {
        this.resetState();
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.resetState();
        }
    }

    resetState = () => {
        afterCursor = null;
        beforeCursor = null;
        this.setState({paginationCount: 1});
        this.setState({searchText: searchTextValue});
    }

    onNextPage = (nextCursor) => {
        afterCursor = nextCursor;
        beforeCursor = null;
        this.setState({paginationCount: this.state.paginationCount + 1});
    }

    onPreviousPage = (previousCursor) => {
        afterCursor = null;
        beforeCursor = previousCursor;
        this.setState({paginationCount: this.state.paginationCount - 1});
    }
}

export default Search;