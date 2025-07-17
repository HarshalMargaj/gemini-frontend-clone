import React, { useRef } from "react";

const ChatInputDropdown = ({ handleSend }) => {
	const fileInputRef = useRef();

	const handleClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			handleSend(file);
		}
	};

	return (
		<div className="shadow-lg dark:bg-neutral-700 rounded-md p-1 cursor-pointer bg-white text-black">
			<div
				className="p-2 rounded-md hover:bg-neutral-100"
				onClick={handleClick}
			>
				Upload Image
			</div>
			<input
				type="file"
				accept="image/*"
				className="hidden"
				ref={fileInputRef}
				onChange={handleFileChange}
			/>
		</div>
	);
};

export default ChatInputDropdown;
