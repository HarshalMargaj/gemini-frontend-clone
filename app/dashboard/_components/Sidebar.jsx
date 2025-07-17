"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Box, EllipsisVertical, PanelLeft, SquarePen } from "lucide-react";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import Tippy from "@tippyjs/react";

import ChatroomMenuDropdownContent from "./ChatroomMenuDropdownContent";

import { useLayoutStore } from "@/app/stores/LayoutStore";
import SearchBar from "./SearchBar";

const Sidebar = () => {
	const [hoverChatId, setHoverChatId] = useState();
	const [selectedChat, setSelectedChat] = useState();

	useEffect(() => {
		const storedId = localStorage.getItem("selectedChat");
		if (storedId) {
			setSelectedChat(storedId);
		}
	}, []);

	const [chatrooms, setChatrooms] = useState([]);
	const router = useRouter();
	const pathname = usePathname();
	const isSidebarOpen = useLayoutStore(state => state.isSidebarOpen);
	const toggleSidebar = useLayoutStore(state => state.toggleSidebar);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredChatrooms, setFilteredChatrooms] = useState([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			const filtered = chatrooms.filter(chat =>
				chat.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredChatrooms(filtered);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery, chatrooms]);

	const displayedChatrooms = searchQuery ? filteredChatrooms : chatrooms;

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
			const timestamp = new Date().toLocaleTimeString();
			const newChatroom = await axios.post(
				"http://localhost:3001/chatrooms",
				{
					id: uuidv4(),
					title: `Chatroom - ${timestamp}`,
					createdAt: new Date().toISOString(),
					messages: [],
				}
			);
			toast.success("New chat created");
			router.push(`/dashboard/${newChatroom.data.id}`);
			localStorage.setItem("selectedChat", newChatroom.data.id);
			const response = await axios.get("http://localhost:3001/chatrooms");
			sortChatrooms(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`dark:bg-[#272A2C] ${
				isSidebarOpen ? "w-[250px]" : "w-[60px]"
			} p-4 dark:text-white space-y-6 h-full bg-white text-neutral-800 border-r border-neutral-200 dark:border-none transition-all ease-in-out fixed top-0 left-0 z-50 sm:relative sm:z-auto ${
				isSidebarOpen ? "translate-x-0" : "-translate-x-full"
			} sm:translate-x-0
	`}
		>
			<Toaster />
			<div className="flex items-center justify-between">
				{isSidebarOpen && <Box />}
				<div onClick={toggleSidebar}>
					<PanelLeft />
				</div>
			</div>
			{isSidebarOpen && (
				<div>
					<SearchBar setSearchQuery={setSearchQuery} />
				</div>
			)}
			<button
				onClick={createChatroom}
				className="flex items-center gap-2 cursor-pointer"
			>
				<SquarePen />
				{isSidebarOpen && "New chat"}
			</button>
			{isSidebarOpen && (
				<div className="space-y-2">
					{displayedChatrooms.map(chatroom => (
						<div
							onMouseEnter={() => setHoverChatId(chatroom.id)}
							onMouseLeave={() => setHoverChatId(null)}
							onClick={() => {
								router.push(`/dashboard/${chatroom.id}`);
								setSelectedChat(chatroom.id);
								localStorage.setItem(
									"selectedChat",
									chatroom.id
								);
							}}
							key={chatroom.id}
							className={`${
								selectedChat === chatroom.id &&
								pathname !== "/dashboard"
									? "dark:bg-[#1E3660] bg-blue-600 text-white"
									: "dark:hover:bg-neutral-700 hover:bg-neutral-300"
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
			)}
		</div>
	);
};

export default Sidebar;
