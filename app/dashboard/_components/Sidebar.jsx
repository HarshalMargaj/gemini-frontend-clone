"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
	const [chatrooms, setChatrooms] = useState([]);
	console.log(chatrooms);

	useEffect(() => {
		const fetchChatrooms = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3001/chatrooms"
				);
				setChatrooms(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchChatrooms();
	}, []);

	return (
		<div className={`bg-[#272A2C] w-[250px] p-4 text-white`}>Sidebar</div>
	);
};

export default Sidebar;
