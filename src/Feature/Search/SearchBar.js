import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
    }
  
    render() {
        return (
            <div>
                <input
                    key="userSearchBar"
                    value={this.state.value}
                    placeholder={"Search users"}
                    onChange={this.onChange}
                    onKeyDown={this.props.onKeyDown}
                />
                <button onClick={this.props.onClick}>Search</button>
            </div>
        );
    }

    onChange = (event) => {
        this.setState({searchText: event.target.value});
        this.props.onChange(event)
    }
}

export default SearchBar;