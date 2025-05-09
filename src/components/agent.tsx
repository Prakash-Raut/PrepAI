"use client";

import { createFeedback } from "@/actions/general";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi";
import type { Message } from "@/types/vapi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

enum CallStatus {
	INACTIVE = "INACTIVE",
	CONNECTING = "CONNECTING",
	ACTIVE = "ACTIVE",
	FINISHED = "FINISHED",
}

type SavedMessage = {
	role: "user" | "system" | "assistant";
	content: string;
};

type AgentProps = {
	userName: string;
	userId?: string;
	type: "generate" | "interview";
	interviewId?: string;
	questions?: string[];
	feedbackId?: string;
};

const Agent = ({
	userName,
	userId,
	type,
	interviewId,
	questions,
	feedbackId,
}: AgentProps) => {
	const router = useRouter();
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
	const [messages, setMessages] = useState<SavedMessage[]>([]);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [lastMessage, setLastMessage] = useState<string>("");

	useEffect(() => {
		const onCallStart = () => {
			setCallStatus(CallStatus.ACTIVE);
		};

		const onCallEnd = () => {
			setCallStatus(CallStatus.FINISHED);
		};

		const onMessage = (message: Message) => {
			if (message.type === "transcript" && message.transcriptType === "final") {
				const newMessage = { role: message.role, content: message.transcript };
				setMessages((prev) => [...prev, newMessage]);
			}
		};

		const onSpeechStart = () => {
			console.log("speech start");
			setIsSpeaking(true);
		};

		const onSpeechEnd = () => {
			console.log("speech end");
			setIsSpeaking(false);
		};

		const onError = (error: Error) => {
			console.log("Error:", error);
		};

		vapi.on("call-start", onCallStart);
		vapi.on("call-end", onCallEnd);
		vapi.on("message", onMessage);
		vapi.on("speech-start", onSpeechStart);
		vapi.on("speech-end", onSpeechEnd);
		vapi.on("error", onError);

		return () => {
			vapi.off("call-start", onCallStart);
			vapi.off("call-end", onCallEnd);
			vapi.off("message", onMessage);
			vapi.off("speech-start", onSpeechStart);
			vapi.off("speech-end", onSpeechEnd);
			vapi.off("error", onError);
		};
	}, []);

	const handleGenerateFeedback = useCallback(
		async (messages: SavedMessage[]) => {
			console.log("Generating feedback...");

			const { success, feedbackId: id } = await createFeedback({
				interviewId: interviewId as string,
				userId: userId as string,
				transcript: messages,
				feedbackId,
			});

			if (success && id) {
				router.push(`/interview/${interviewId}/feedback`);
			} else {
				console.log("Error saving feedback");
				router.push("/");
			}
		},
		[router, interviewId, feedbackId, userId],
	);

	useEffect(() => {
		if (messages.length > 0) {
			setLastMessage(messages[messages.length - 1].content);
		}

		if (callStatus === CallStatus.FINISHED) {
			if (type === "generate") {
				router.push("/");
			} else {
				handleGenerateFeedback(messages);
			}
		}
	}, [callStatus, handleGenerateFeedback, messages, router, type]);

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING);

		if (type === "generate") {
			await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
				variableValues: {
					username: userName,
					userId: userId,
				},
			});
		} else {
			let formattedQuestions = "";
			if (questions) {
				formattedQuestions = questions
					.map((question) => `- ${question}`)
					.join("\n");
			}

			await vapi.start(
				{},
				{
					variableValues: {
						questions: formattedQuestions,
					},
				},
			);
		}
	};

	const handleDisconnect = () => {
		setCallStatus(CallStatus.FINISHED);
		vapi.stop();
	};

	return (
		<>
			<div className="call-view">
				<div className="card-interviewer">
					<div className="avatar">
						<Image
							src="/ai-avatar.png"
							alt="vapi"
							width={65}
							height={54}
							className="object-cover"
						/>
						{isSpeaking && <span className="animate-speak" />}
					</div>
					<h3>AI Interviewer</h3>
				</div>

				<div className="card-border">
					<div className="card-content">
						<Image
							src="/user-avatar.png"
							alt="user avatar"
							width={540}
							height={540}
							className="rounded-full object-cover size-[120px]"
						/>
						<h3>{userName}</h3>
					</div>
				</div>
			</div>
			{messages.length > 0 && (
				<div className="transcript-border">
					<div className="transcript">
						<p
							key={lastMessage}
							className={cn(
								"transition-opacity duration-500 opacity-0",
								"animate-fadeIn opacity-100",
							)}
						>
							{lastMessage}
						</p>
					</div>
				</div>
			)}

			<div className="w-full flex justify-center">
				{callStatus !== CallStatus.ACTIVE ? (
					<button
						type="button"
						className="relative btn-call"
						onClick={() => handleCall()}
					>
						<span
							className={cn(
								"absolute animate-ping rounded-full opacity-75",
								callStatus !== CallStatus.CONNECTING && "hidden",
							)}
						/>

						<span className="relative">
							{callStatus === CallStatus.INACTIVE ||
							callStatus === CallStatus.FINISHED
								? "Call"
								: ". . ."}
						</span>
					</button>
				) : (
					<button
						type="button"
						className="btn-disconnect"
						onClick={() => handleDisconnect()}
					>
						End
					</button>
				)}
			</div>
		</>
	);
};

export default Agent;
