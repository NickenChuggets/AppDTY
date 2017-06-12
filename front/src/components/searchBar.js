import React, { Component } from 'react';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChange(term) {
		this.setState({ term });
	}

	onSubmit() {
		this.props.search(this.state.term);
	}

	render() {
		return (
			<form onSubmit={event => {
				event.preventDefault();
				this.onSubmit()}}
			>
				<InputGroup>
					<Input
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
					<InputGroupButton>
						<Button>Search</Button>
					</InputGroupButton>
				</InputGroup>
			</form>
		);
	}
}

export default SearchBar;
