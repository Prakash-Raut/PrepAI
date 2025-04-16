"use server";

import { db } from "@/firebase/admin";
import type { GetLatestInterviewsParams, Interview } from "@/types";

export async function getLatestInterviews(
	params: GetLatestInterviewsParams,
): Promise<Interview[]> {
	const { userId, limit = 20 } = params;

	const interviews = await db
		.collection("interviews")
		.orderBy("createdAt", "desc")
		.where("finalized", "==", true)
		.where("userId", "!=", userId)
		.limit(limit)
		.get();

	const latestInterviews = interviews.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Interview[];

	return latestInterviews ?? [];
}

export async function getInterviewsByUserId(
	userId: string,
): Promise<Interview[]> {
	const interviews = await db
		.collection("interviews")
		.where("userId", "==", userId)
		.orderBy("createdAt", "desc")
		.get();

	const userInterviews = interviews.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Interview[];

	return userInterviews ?? [];
}

export async function getInterviewById(id: string): Promise<Interview | null> {
	const interview = await db.collection("interviews").doc(id).get();

	return interview.data() as Interview | null;
}
