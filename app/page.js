import { redirect } from "next/navigation";

export default function Home() {
	return <div>{redirect("/login")}</div>;
}
