"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SquarePen } from "lucide-react";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = () => {
	const [chatrooms, setChatrooms] = useState([]);
	const router = useRouter();

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

	const createChatroom = async () => {
		try {
			const newChatroom = await axios.post(
				"http://localhost:3001/chatrooms",
				{
					id: uuidv4(),
					title: "Simple Greeting and Response",
					createdAt: new Date().toISOString(),
				}
			);
			toast.success("New chat created");
			router.push(`/dashboard/${newChatroom.data.id}`);
			const response = await axios.get("http://localhost:3001/chatrooms");
			setChatrooms(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={`bg-[#272A2C] w-[250px] p-4 text-white space-y-6`}>
			<Toaster />
			<button
				onClick={createChatroom}
				className="flex items-center gap-2 cursor-pointer"
			>
				<SquarePen />
				New chat
			</button>
			<div className="space-y-2">
				{chatrooms.map(chatroom => (
					<div
						onClick={() => router.push(`/dashboard/${chatroom.id}`)}
						key={chatroom.id}
						className="bg-[#1E3660] rounded-lg p-2 truncate cursor-pointer text-sm"
					>
						{chatroom.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
