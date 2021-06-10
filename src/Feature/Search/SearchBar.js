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
                />
                <button onClick={this.props.onClick}>Search</button>
            </div>
        );
    }

    onChange = (e) => {
        this.setState({searchText: e.target.value});
        this.props.onChange(e)
    }
}

export default SearchBar;