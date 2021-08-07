import React, { useState, useEffect } from 'react';
export default function App(props) {
	const [turtles, setTurtles] = useState([]);
	const [singleTurtle, setTurtle] = useState({
		name: '',
		role: ''
	});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/turtles'); // <===== Postman Query
				const data = await response.json(); // Receive data turn it into a js object or array
				setTurtles(data); // Store that JS Object or Array
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleClick = async e => {
		try {
			const response = await fetch('/api/turtles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: 'Santos',
					role: 'Super Awesome Student'
				})
			});
			const data = await response.json();
			setTurtles([...turtles, data]);
			setTurtle(data);
		} catch (error) {
			console.error(error);
		}
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/turtles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(singleTurtle)
			});
			const data = await response.json();
			setTurtles([...turtles, data]);
			setTurtle({
				name: '',
				role: ''
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleChange = e => {
		setTurtle({ ...singleTurtle, [e.target.id]: e.target.value });
	};
	return (
		<div className="AppPage">
			This is the {props.page} page
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="name"
					value={singleTurtle.name}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="role"
					value={singleTurtle.role}
					onChange={handleChange}
				/>
				<input type="submit" value="Submit" />
			</form>
			<ul>
				{turtles.map(turtle => {
					return (
						<li key={turtle._id}>
							The turtle is named {turtle.name} and its role is {turtle.role}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
