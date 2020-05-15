import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import User from './User';

function App() {
	const initialUser = {
		name: '',
	};

	const [users, setUsers] = useState();
	const [newUser, setNewUser] = useState(initialUser);

	// Function that fetch users from db
	const getUsers = () => {
		axios
			.get('http://localhost:4000/api/users')
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(`Error message: ${err}`));
	};

	useEffect(() => {
		getUsers();
	}, []);

	// Function that deletes selected user from db
	const deleteUser = (userId) => {
		console.log(userId);
		axios
			.delete(`http://localhost:4000/api/users/${userId}`)
			.then((res) => {
				console.log(res);
				getUsers();
			})
			.catch((err) => console.log(`Error message: ${err}`));
	};

	// Functions that add user to db

	const handleUserInput = (e) => {
		setNewUser({ ...newUser, name: e.target.value });
		console.log(newUser);
	};

	const addNewUser = (e) => {
		e.preventDefault();
		axios.post('http://localhost:4000/api/users', newUser).then((res) => {
			console.log(res.data);
			getUsers();
		});
	};

	return (
		<div className="App">
			<h1>List of users</h1>
			<form onSubmit={addNewUser} className="add-user">
				<input
					type="text"
					name="name"
					placeholder="Enter name..."
					value={newUser.name}
					onChange={handleUserInput}
				/>
				<button>Add</button>
			</form>
			<ul>
				{users &&
					users.map((user) => (
						<User
							key={user.id}
							user={user}
							deleteUser={deleteUser}
							users={users}
							getUsers={getUsers}
						/>
					))}
			</ul>
		</div>
	);
}

export default App;
