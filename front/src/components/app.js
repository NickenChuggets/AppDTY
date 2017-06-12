import React, { Component } from 'react';

import UserTable from './userTable';
import ChangeRankPopup from './changeRankPopup';
import DeleteUserPopup from './deleteUserPopup';
import AddUserPopup from './addUserPopup';
import SearchBar from './searchBar';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userList: [],
			isRankPopupOpen: false,
			isDeletePopupOpen: false,
			isAddPopupOpen: false,
			popupId: -1,
		};

		this.refresh = this.refresh.bind(this);
		this.search = this.search.bind(this);
		this.toggleRankPopup = this.toggleRankPopup.bind(this);
		this.toggleDeletePopup = this.toggleDeletePopup.bind(this);
		this.toggleAddPopup = this.toggleAddPopup.bind(this);
	}
	refresh() {
		fetch('http://localhost:3000/users/', { method: 'GET' })
			.then(res => res.json())
			.then(json => this.setState({ userList: json }));
	}
	search(name) {
		fetch(`http://localhost:3000/users/?name=${name}`, { method: 'GET' })
			.then(res => res.json())
			.then(json => this.setState({ userList: json }));
	}
	componentDidMount() {
		this.refresh();
	}
	toggleRankPopup(id) {
		this.setState({
			isRankPopupOpen: !this.state.isRankPopupOpen,
			popupId: id,
		});
	}
	toggleDeletePopup(id) {
		this.setState({
			isDeletePopupOpen: !this.state.isDeletePopupOpen,
			popupId: id,
		});
	}
	toggleAddPopup() {
		this.setState({ isAddPopupOpen: !this.state.isAddPopupOpen });
	}
	changeRank(id, rank) {
		const userList = this.state.userList;
		userList.filter(user => user.id === id);
	}
	render() {
		return (
			<div style={{ margin: '2em' }} >
				<SearchBar
					search={this.search}
				/>
				<UserTable
					userList={this.state.userList}
					openRankPopup={this.toggleRankPopup}
					openDeletePopup={this.toggleDeletePopup}
					openAddPopup={this.toggleAddPopup}
				/>
				<ChangeRankPopup
					isOpen={this.state.isRankPopupOpen}
					toggle={this.toggleRankPopup}
					userId={this.state.popupId}
					onSubmit={this.refresh}
				/>
				<DeleteUserPopup
					isOpen={this.state.isDeletePopupOpen}
					toggle={this.toggleDeletePopup}
					userId={this.state.popupId}
					onSubmit={this.refresh}
				/>
				<AddUserPopup
					isOpen={this.state.isAddPopupOpen}
					toggle={this.toggleAddPopup}
					onSubmit={this.refresh}
				/>
			</div>
		);
	}
}

export default App;
