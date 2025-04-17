export type ChildrenProps = {
	children: React.ReactNode;
};

export type Feedback = {
	id: string;
	interviewId: string;
	totalScore: number;
	categoryScores: Array<{
		name: string;
		score: number;
		comment: string;
	}>;
	strengths: string[];
	areasForImprovement: string[];
	finalAssessment: string;
	createdAt: string;
};

export type Interview = {
	id: string;
	role: string;
	level: string;
	questions: string[];
	techstack: string[];
	createdAt: string;
	userId: string;
	type: string;
	finalized: boolean;
};

export type User = {
	name: string;
	email: string;
	id: string;
};

export type SignInParams = {
	email: string;
	idToken: string;
};

export type SignUpParams = {
	uid: string;
	name: string;
	email: string;
	password: string;
};

export type GetLatestInterviewsParams = {
	userId: string;
	limit?: number;
};

export type CreateFeedbackParams = {
	interviewId: string;
	userId: string;
	transcript: { role: string; content: string }[];
	feedbackId?: string;
};

export type GetFeedbackByInterviewIdParams = {
	interviewId: string;
	userId: string;
};
