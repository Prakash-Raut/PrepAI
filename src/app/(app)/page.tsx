import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const hasPastInterviews = true;
	const hasUpcomingInterviews = true;
	return (
		<>
			<section className="card-cta">
				<div className="flex flex-col gap-6 max-w-lg">
					<h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
					<p>Practice on real interview questions and get instant feedback</p>

					<Button asChild className="btn-primary">
						<Link href="/interview">Start an Interview</Link>
					</Button>
				</div>
				<Image
					src="/robot.png"
					alt="robot"
					width={400}
					height={300}
					className="max-sm:hidden"
				/>
			</section>

			<section className="flex flex-col gap-6 mt-8">
				<h2>Your Interviews</h2>

				<div className="interviews-section">
					{hasPastInterviews ? (
						dummyInterviews.map((interview) => (
							<InterviewCard
								key={interview.id}
								userId={interview.userId}
								interviewId={interview.id}
								role={interview.role}
								type={interview.type}
								techstack={interview.techstack}
								createdAt={interview.createdAt}
							/>
						))
					) : (
						<p>You haven&apos;t taken any interviews yet</p>
					)}
				</div>
			</section>

			<section className="flex flex-col gap-6 mt-8">
				<h2>Take Interviews</h2>

				<div className="interviews-section">
					{hasUpcomingInterviews ? (
						dummyInterviews?.map((interview) => (
							<InterviewCard
								key={interview.id}
								userId={interview.userId}
								interviewId={interview.id}
								role={interview.role}
								type={interview.type}
								techstack={interview.techstack}
								createdAt={interview.createdAt}
							/>
						))
					) : (
						<p>There are no interviews available</p>
					)}
				</div>
			</section>
		</>
	);
}
