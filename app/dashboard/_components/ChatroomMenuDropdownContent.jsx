import axios from "axios";
import { Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const ChatroomMenuDropdownContent = ({ id, setChatrooms }) => {
	const deleteChatroom = async () => {
		try {
			await axios.delete(`http://localhost:3001/chatrooms/${id}`);
			const response = await axios.get("http://localhost:3001/chatrooms");
			setChatrooms(response.data);
			toast.success("Chatroom deleted");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className=" shadow-lg dark:bg-neutral-700 text-white p-1 rounded-md">
			<div
				onClick={deleteChatroom}
				className="flex items-center gap-2 text-red-400 cursor-pointer px-2 py-1 dark:hover:bg-neutral-600 hover:bg-neutral-100 rounded-md"
			>
				<Trash size={15} /> Delete
			</div>
		</div>
	);
};

export default ChatroomMenuDropdownContent;
