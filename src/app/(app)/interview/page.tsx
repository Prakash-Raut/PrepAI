import Agent from "@/components/agent";

const InterviewPage = async () => {
	return (
		<>
			<h3>Interview Generation</h3>
			<Agent userName="You" userId="user1" type="generate" />
		</>
	);
};

export default InterviewPage;
