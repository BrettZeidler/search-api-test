import React from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: 'example',
            searchResults: []
        }
    }
  
    getSnapshotBeforeUpdate(prevProps, prevState) {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
  
    render() {
        return (
            <div>
                <SearchBar />
                <SearchResults searchQuery={this.state.searchText}/>
            </div>
        );
    }
}

export default Search;