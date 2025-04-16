import { getCurrentUser } from "@/actions/auth";
import Agent from "@/components/agent";
import { redirect } from "next/navigation";

const InterviewPage = async () => {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/sign-in");
	}

	return (
		<>
			<h3>Interview Generation</h3>
			<Agent userName={user.name} userId={user.id} type="generate" />
		</>
	);
};

export default InterviewPage;
