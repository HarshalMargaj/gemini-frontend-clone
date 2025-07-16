"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";
import CountryCodeDropdownContent from "./_components/CountryCodeDropdownContent";

const Tippy = dynamic(() => import("@tippyjs/react"), {
	ssr: false,
});

const otpSchema = z.object({
	phone: z
		.string()
		.min(10, "Phone number must be 10 digits")
		.max(10, "Phone number must be 10 digits"),
	countryCode: z.string(),
	otp: z.string().optional(),
});

export default function LoginPage() {
	const [showOtp, setShowOtp] = useState(false);
	const [countryCodes, setCountryCodes] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchCountryCodes = async () => {
			try {
				const response = await axios.get(
					"https://restcountries.com/v3.1/all?fields=name,flags,idd"
				);
				console.log(response.data);
				setCountryCodes(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCountryCodes();
	}, []);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			phone: "",
			countryCode: "+91",
			otp: "",
		},
	});

	const onSubmit = data => {
		if (!showOtp) {
			setTimeout(() => {
				toast.dismiss();
				toast.success("OTP sent to your number!");
				setShowOtp(true);
			}, 1500);
		} else {
			if (data.otp === "1234") {
				toast.success("OTP verified!");
				localStorage.setItem(
					"auth",
					JSON.stringify({ phone: data.phone })
				);
				router.push("/dashboard");
			} else {
				toast.error("Invalid OTP");
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#1B1C1D]">
			<Toaster />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-[#272A2C] p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
			>
				<h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
					Login via OTP
				</h2>

				<div className="flex items-center space-x-2">
					<Tippy
						interactive={true}
						trigger="click"
						placement="bottom-end"
						content={
							<CountryCodeDropdownContent
								countryCodes={countryCodes}
								setValue={setValue}
							/>
						}
					>
						<div className="border rounded dark:bg-gray-700 dark:text-white p-2 h-10 flex items-center justify-center w-15">
							{watch("countryCode")}
						</div>
					</Tippy>

					<input
						type="tel"
						placeholder="Phone number"
						inputMode="numeric"
						pattern="[0-9]*"
						onInput={e => {
							e.target.value = e.target.value.replace(/\D/g, "");
						}}
						{...register("phone")}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
					/>
				</div>
				{errors.phone && (
					<p className="text-red-500 text-sm">
						{errors.phone.message}
					</p>
				)}

				{showOtp && (
					<input
						type="text"
						placeholder="Enter OTP"
						{...register("otp")}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
					/>
				)}

				<button
					type="submit"
					className="w-full bg-[#368BFF] hover:bg-blue-700 text-white p-2 rounded"
				>
					{showOtp ? "Verify OTP" : "Send OTP"}
				</button>
			</form>
		</div>
	);
}
