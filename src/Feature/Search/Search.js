import React from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

var searchTextValue = ''

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            searchResults: []
        }
    }
  
    render() {
        return (
            <div>
                <SearchBar value={searchTextValue} onChange={this.onChange} onClick={this.onClick}/>
                <SearchResults searchQuery={this.state.searchText}/>
            </div>
        );
    }

    onChange = (e) => {
        searchTextValue = e.target.value
    }

    onClick = () => {
        this.setState({searchText: searchTextValue});
    }
}

export default Search;