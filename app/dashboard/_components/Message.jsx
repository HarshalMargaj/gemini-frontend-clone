"use client";

import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

const Message = ({ msg }) => {
	const [copied, setCopied] = useState(false);
	const [showCopy, setShowCopy] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(msg.text);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	};

	return (
		<div
			onMouseEnter={() => setShowCopy(true)}
			onMouseLeave={() => setShowCopy(false)}
			className={`flex py-4 ${
				msg.role === "user" ? "justify-end" : "justify-start "
			}`}
		>
			<div
				className={`max-w-xs px-4 py-2 rounded-lg ${
					msg.role === "user" ? "bg-blue-600" : "bg-neutral-700"
				}`}
			>
				<div className="flex items-center gap-2 justify-between relative">
					<p
						className={`text-sm flex items-center justify-between gap-4 ${
							showCopy ? "truncate" : ""
						}`}
					>
						{msg.text}
					</p>
					{showCopy && (
						<div className="cursor-pointer absolute -right-2 -bottom-12">
							{copied ? (
								<Check size={15} />
							) : (
								<Copy size={15} onClick={handleCopy} />
							)}
						</div>
					)}
				</div>
				<p className="text-xs text-right opacity-50">{msg.timestamp}</p>
			</div>
		</div>
	);
};

export default Message;
