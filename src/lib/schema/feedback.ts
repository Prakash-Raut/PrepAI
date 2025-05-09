import { z } from "zod";

const categoryName = z.enum([
	"Communication Skills",
	"Technical Knowledge",
	"Problem Solving",
	"Cultural Fit",
	"Confidence and Clarity",
]);

export const feedbackSchema = z.object({
	totalScore: z.number(),
	categoryScores: z.array(
		z.object({
			name: categoryName,
			score: z.number(),
			comment: z.string(),
		}),
	),
	strengths: z.array(z.string()),
	areasForImprovement: z.array(z.string()),
	finalAssessment: z.string(),
});
