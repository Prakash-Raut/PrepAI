import { getCurrentUser } from "@/actions/auth";
import { getInterviewsByUserId, getLatestInterviews } from "@/actions/general";
import InterviewCard from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/sign-in");
	}

	const [userInterviews, latestInterviews] = await Promise.all([
		await getInterviewsByUserId(user.id),
		await getLatestInterviews({ userId: user.id }),
	]);

	const hasPastInterviews = userInterviews.length > 0;
	const hasUpcomingInterviews = latestInterviews.length > 0;

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
						userInterviews?.map((interview) => (
							<InterviewCard
								key={interview.id}
								id={interview.id}
								userId={interview.userId}
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
						latestInterviews?.map((interview) => (
							<InterviewCard
								key={interview.id}
								id={interview.id}
								userId={interview.userId}
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

			<footer className="text-white py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<Link href="/" className="flex items-start gap-2">
							<Image src="/logo.svg" alt="logo" width={38} height={32} />
							<h3 className="text-xl font-bold mb-4">Prep AI</h3>
						</Link>
						<p className="text-gray-400">The AI-powered platform that helps you ace your technical interviews.</p>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">Resources</h4>
						<ul className="space-y-2">
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							Blog
							</Link>
						</li>
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							Guides
							</Link>
						</li>
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							FAQ
							</Link>
						</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">Company</h4>
						<ul className="space-y-2">
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							About
							</Link>
						</li>
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							Careers
							</Link>
						</li>
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							Contact
							</Link>
						</li>
						</ul>
					</div>

					<div>
						<h4 className="text-lg font-semibold mb-4">Legal</h4>
						<ul className="space-y-2">
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							Privacy
							</Link>
						</li>
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							Terms
							</Link>
						</li>
						<li>
							<Link href="#" className="text-gray-400 hover:text-white transition">
							Cookie Policy
							</Link>
						</li>
						</ul>
					</div>
					</div>

					<div className="border-t border-gray-800 mt-12 pt-8 text-center">
					<p className="flex items-center justify-center text-gray-400">
						Made with <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" /> by Prep AI Team
					</p>
					<p className="mt-2 text-gray-500">© {new Date().getFullYear()} Prep AI. All rights reserved.</p>
					</div>
				</div>
    		</footer>
		</>
	);
};

export default Home;
