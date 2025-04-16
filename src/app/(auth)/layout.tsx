import { isAuthenticated } from "@/actions/auth";
import type { ChildrenProps } from "@/types";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: ChildrenProps) => {
	const isUserAuthenticated = await isAuthenticated();

	if (isUserAuthenticated) {
		redirect("/");
	}

	return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
