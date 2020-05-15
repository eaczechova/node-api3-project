import React, { useState } from 'react';
import axios from 'axios';

const User = ({ users, user, deleteUser, getUsers }) => {
	const [editing, setEditing] = useState(false);
	const [editedUser, setEditedUser] = useState({ name: user.name });

	const editUser = (userId) => {
		setEditing(true);
	};

	const handleUserChange = (e) => {
		setEditedUser({ ...editedUser, name: e.target.value });
	};

	const userSubmit = (e) => {
		e.preventDefault();
		setEditing(false);

		axios
			.put(`http://localhost:4000/api/users/${user.id}`, editedUser)
			.then((res) => {
				setEditing(false);

				getUsers();
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{!editing ? (
				<li key={user.id}>
					<div>
						<h3>{user.name}</h3>
						<button onClick={() => deleteUser(user.id)}>Delete</button>
						<button onClick={editUser}>Edit</button>
					</div>
				</li>
			) : (
				<li key={user.id}>
					<form onSubmit={userSubmit}>
						<input
							type="text"
							name="name"
							placeholder="Enter name..."
							value={editedUser.name}
							onChange={handleUserChange}
						/>
						<button>Save</button>
					</form>
				</li>
			)}
		</>
	);
};

export default User;
