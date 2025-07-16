"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { EllipsisVertical, SquarePen } from "lucide-react";
import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import Tippy from "@tippyjs/react";
import ChatroomMenuDropdownContent from "./ChatroomMenuDropdownContent";

const Sidebar = () => {
	const [hoverChatId, setHoverChatId] = useState();
	const [selectedChat, setSelectedChat] = useState();
	const [chatrooms, setChatrooms] = useState([]);
	const router = useRouter();

	const sortChatrooms = data => {
		const sorted = data.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		setChatrooms(sorted);
	};

	useEffect(() => {
		const fetchChatrooms = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3001/chatrooms"
				);
				sortChatrooms(response.data);
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
			setSelectedChat(newChatroom.data.id);
			const response = await axios.get("http://localhost:3001/chatrooms");
			sortChatrooms(response.data);
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
						onMouseEnter={() => setHoverChatId(chatroom.id)}
						onMouseLeave={() => setHoverChatId(null)}
						onClick={() => {
							router.push(`/dashboard/${chatroom.id}`);
							setSelectedChat(chatroom.id);
						}}
						key={chatroom.id}
						className={`${
							selectedChat === chatroom.id
								? "bg-[#1E3660]"
								: "hover:bg-neutral-700"
						} rounded-lg p-2  cursor-pointer text-sm flex items-center justify-between h-8`}
					>
						<div className="truncate">{chatroom.title}</div>
						{hoverChatId === chatroom.id && (
							<Tippy
								interactive={true}
								placement="right"
								trigger="click"
								content={
									<ChatroomMenuDropdownContent
										id={chatroom.id}
										setChatrooms={setChatrooms}
									/>
								}
							>
								<div className="hover:bg-white/5 rounded-full p-1">
									<EllipsisVertical size={15} />
								</div>
							</Tippy>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
