import { isAuthenticated } from "@/actions/auth";
import type { ChildrenProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: ChildrenProps) => {
	const isUserAuthenticated = await isAuthenticated();

	if (!isUserAuthenticated) {
		redirect("/sign-in");
	}

	return (
		<div className="root-layout">
			<nav>
				<Link href="/" className="flex items-center gap-2">
					<Image src="/logo.svg" alt="logo" width={38} height={32} />
					<h2 className="text-primary-100">Perp AI</h2>
				</Link>
			</nav>
			{children}
		</div>
	);
};

export default RootLayout;
