import React from "react";

const Message = ({ msg }) => {
	return (
		<div
			className={`flex ${
				msg.role === "user" ? "justify-end" : "justify-start"
			}`}
		>
			<div
				className={`max-w-xs px-4 py-2 rounded-lg ${
					msg.role === "user" ? "bg-blue-600" : "bg-neutral-700"
				}`}
			>
				<p className="text-sm">{msg.text}</p>
				<p className="text-xs text-right opacity-50">{msg.timestamp}</p>
			</div>
		</div>
	);
};

export default Message;
