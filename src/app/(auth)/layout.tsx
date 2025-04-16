import type { ChildrenProps } from "@/types";

const AuthLayout = ({ children }: ChildrenProps) => {
	return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
