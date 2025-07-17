"use client";

import axios from "axios";
import React, { useState } from "react";

const ChatInput = ({ messages, setMessages, id, setIsTyping }) => {
	const [input, setInput] = useState("");

	const handleSend = async () => {
		if (!input.trim()) return;

		const userMessage = {
			id: Date.now(),
			role: "user",
			text: input,
			timestamp: new Date().toLocaleTimeString(),
		};

		const updatedMessages = [...messages, userMessage];

		try {
			await axios.patch(`http://localhost:3001/chatrooms/${id}`, {
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
					timestamp: new Date().toLocaleTimeString(),
				};

				const newMessages = [...updatedMessages, aiMessage];

				await axios.patch(`http://localhost:3001/chatrooms/${id}`, {
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
			<input
				value={input}
				onChange={e => setInput(e.target.value)}
				onKeyDown={e => e.key === "Enter" && handleSend()}
				placeholder="Type your message..."
				className="flex-1 p-2 rounded bg-[#272A2C] text-white border border-neutral-600 outline-none"
			/>
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
