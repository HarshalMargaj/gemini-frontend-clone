"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

import axios from "axios";

import Message from "../_components/Message";
import ChatInput from "../_components/ChatInput";

export default function ChatroomPage() {
	const { id } = useParams();
	const [messages, setMessages] = useState([]);

	const [isTyping, setIsTyping] = useState(false);
	const bottomRef = useRef(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		const fetchChatroomMessages = async () => {
			try {
				const response = await axios.get(
					`https://chatrooms-db.onrender.com/chatrooms/${id}`
				);
				setMessages(response.data.messages || []);
			} catch (error) {
				console.log(error);
			}
		};
		fetchChatroomMessages();
	}, []);

	return (
		<div className="flex flex-col flex-1 h-full dark:bg-[#1B1C1D] dark:text-white bg-white px-6 py-4">
			{messages.length === 0 ? (
				<div className="text-purple-400 font-bold text-4xl h-full flex items-center justify-center ">
					Hello, Anonymouse
				</div>
			) : (
				<div className="flex-1 scrollbar-hide overflow-y-auto space-y-4">
					{messages?.map(msg => (
						<Message key={msg.id} msg={msg} />
					))}

					{isTyping && (
						<div className="text-sm text-gray-400 italic">
							Gemini is typing...
						</div>
					)}

					<div ref={bottomRef} />
				</div>
			)}
			<ChatInput
				messages={messages}
				setMessages={setMessages}
				id={id}
				setIsTyping={setIsTyping}
			/>
		</div>
	);
}
