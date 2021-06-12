import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
    }
  
    render() {
        return (
            <Jumbotron className="App-header">
                <Row>
                    <h1>Search GitHub Users</h1>
                </Row>
                <Row>
                    <InputGroup className="mb-3">
                        <FormControl
                            className="SearchInput-dark"
                            aria-label="Search users"
                            aria-describedby="Search users"
                            key="userSearchBar"
                            value={this.state.value}
                            placeholder={"Search users"}
                            onChange={this.onChange}
                            onKeyDown={this.props.onKeyDown}
                        />
                        <InputGroup.Append>
                            <Button className="SearchButton-dark" variant="outline-light" onClick={this.props.onClick}>
                                Search
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
            </Jumbotron>
        );
    }

    onChange = (event) => {
        this.setState({searchText: event.target.value});
        this.props.onChange(event)
    }
}

export default SearchBar;