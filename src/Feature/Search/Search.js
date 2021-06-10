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
                <SearchBar 
                    value={searchTextValue} 
                    onChange={this.onChange} 
                    onClick={this.onClick} 
                    onKeyDown={this.onKeyDown} 
                />
                <SearchResults searchQuery={this.state.searchText}/>
            </div>
        );
    }

    onChange = (event) => {
        searchTextValue = event.target.value
    }

    onClick = () => {
        this.setState({searchText: searchTextValue});
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({searchText: searchTextValue});
        }
    }
}

export default Search;