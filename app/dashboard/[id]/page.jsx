"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ChatroomPage() {
	const { id } = useParams();
	const [messages, setMessages] = useState([]);
	console.log(messages);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		const fetchChatroomMessages = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/chatrooms/${id}`
				);
				setMessages(response.data.messages || []);
			} catch (error) {
				console.log(error);
			}
		};
		fetchChatroomMessages();
	}, []);

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
		<div className="flex flex-col flex-1 h-full bg-[#1B1C1D] text-white px-6 py-4">
			<div className="flex-1 overflow-y-auto space-y-4">
				{messages?.map(msg => (
					<div
						key={msg.id}
						className={`flex ${
							msg.role === "user"
								? "justify-end"
								: "justify-start"
						}`}
					>
						<div
							className={`max-w-xs px-4 py-2 rounded-lg ${
								msg.role === "user"
									? "bg-blue-600"
									: "bg-neutral-700"
							}`}
						>
							<p className="text-sm">{msg.text}</p>
							<p className="text-xs text-right opacity-50">
								{msg.timestamp}
							</p>
						</div>
					</div>
				))}

				{isTyping && (
					<div className="text-sm text-gray-400 italic">
						Gemini is typing...
					</div>
				)}

				<div ref={bottomRef} />
			</div>

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
		</div>
	);
}
