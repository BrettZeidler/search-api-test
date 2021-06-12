import React from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

var searchTextValue = ''

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            afterCursor: null,
            beforeCursor: null
        };
    }
  
    render() {
        return (
            <div>
                <SearchBar 
                    value={searchTextValue.trim()} 
                    onChange={this.onChange} 
                    onClick={this.onClick} 
                    onKeyDown={this.onKeyDown} 
                />
                <SearchResults
                    searchQuery={this.state.searchText}
                    after={this.state.afterCursor}
                    before={this.state.beforeCursor}
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
        this.setState({afterCursor: null});
        this.setState({beforeCursor: null});
        this.setState({searchText: searchTextValue});
    }

    onNextPage = (nextCursor) => {
        this.setState({afterCursor: nextCursor});
        this.setState({beforeCursor: null});
    }

    onPreviousPage = (previousCursor) => {
        this.setState({afterCursor: null});
        this.setState({beforeCursor: previousCursor});
    }
}

export default Search;