"use client";

import Tippy from "@tippyjs/react";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import ChatInputDropdown from "./ChatInputDropdown";

const ChatInput = ({ messages, setMessages, id, setIsTyping }) => {
	const [input, setInput] = useState("");

	const handleSend = async file => {
		if (!input.trim() && !file) return;

		const timestamp = new Date().toLocaleTimeString();

		let userMessage;

		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				userMessage = {
					id: Date.now(),
					role: "user",
					type: "image",
					image: reader.result,
					timestamp,
				};

				const updatedMessages = [...messages, userMessage];

				try {
					await axios.patch(`https://chatrooms-db.onrender.com/chatrooms/${id}`, {
						messages: updatedMessages,
					});

					setMessages(updatedMessages);
					setIsTyping(true);

					setTimeout(async () => {
						const aiMessage = {
							id: Date.now() + 1,
							role: "ai",
							text: "Nice image!",
							timestamp: new Date().toLocaleTimeString(),
						};

						const newMessages = [...updatedMessages, aiMessage];

						await axios.patch(
							`https://chatrooms-db.onrender.com/chatrooms/${id}`,
							{
								messages: newMessages,
							}
						);

						setMessages(newMessages);
						setIsTyping(false);
					}, 1500);
				} catch (error) {
					console.log(error);
				}
			};
			reader.readAsDataURL(file);
			return;
		}

		userMessage = {
			id: Date.now(),
			role: "user",
			text: input,
			timestamp,
		};

		const updatedMessages = [...messages, userMessage];

		try {
			await axios.patch(`https://chatrooms-db.onrender.com/chatrooms/${id}`, {
				messages: updatedMessages,
			});

			setMessages(updatedMessages);
			setInput("");
			setIsTyping(true);

			setTimeout(async () => {
				const aiMessage = {
					id: Date.now() + 1,
					role: "ai",
					text: "This is a simulated response from Gemini.",
					timestamp,
				};

				const newMessages = [...updatedMessages, aiMessage];

				await axios.patch(`https://chatrooms-db.onrender.com/chatrooms/${id}`, {
					messages: newMessages,
				});

				setMessages(newMessages);
				setIsTyping(false);
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mt-4 flex">
			<div className="border dark:border-neutral-600 border-neutral-400 p-2 w-full rounded-md flex gap-2 items-center text-neutral-700 dark:text-white">
				<Tippy
					interactive={true}
					trigger="click"
					placement="top-start"
					content={<ChatInputDropdown handleSend={handleSend} />}
				>
					<div className="cursor-pointer text-neutral-400 dark:hover:bg-neutral-700 hover:bg-neutral-100 p-2 rounded-full">
						<CirclePlus size={15} />
					</div>
				</Tippy>
				<input
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyDown={e => e.key === "Enter" && handleSend()}
					placeholder="Type your message..."
					className=" outline-none w-full"
				/>
			</div>
			<button
				onClick={handleSend}
				className="ml-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
			>
				Send
			</button>
		</div>
	);
};

export default ChatInput;
