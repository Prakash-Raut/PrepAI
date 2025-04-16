import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { getRandomInterviewCover } from "@/lib/utils";

export async function GET(request: NextRequest) {
	return NextResponse.json(
		{ success: true, data: "THANK YOU!" },
		{ status: 200 },
	);
}

export async function POST(request: NextRequest) {
	const { type, role, level, techstack, amount, userId } = await request.json();

	try {
		const { text: questions } = await generateText({
			model: google("gemini-2.0-flash-001"),
			prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
		});

		const interview = {
			role: role,
			type: type,
			level: level,
			techstack: techstack.split(","),
			questions: JSON.parse(questions),
			userId: userId,
			finalized: true,
			coverImage: getRandomInterviewCover(),
			createdAt: new Date().toISOString(),
		};

		await db.collection("interviews").add(interview);

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error(
			"🚨 Failed to generate interview questions or save to Firestore",
			{
				payload: { type, role, level, techstack, amount, userId },
			},
		);
		return NextResponse.json(
			{
				success: false,
				error: "Internal Server Error. Please try again later.",
			},
			{ status: 500 },
		);
	}
}
