import type { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
	"react.js": "react",
	reactjs: "react",
	react: "react",
	"next.js": "nextjs",
	nextjs: "nextjs",
	next: "nextjs",
	"vue.js": "vuejs",
	vuejs: "vuejs",
	vue: "vuejs",
	"express.js": "express",
	expressjs: "express",
	express: "express",
	"node.js": "nodejs",
	nodejs: "nodejs",
	node: "nodejs",
	mongodb: "mongodb",
	mongo: "mongodb",
	mongoose: "mongoose",
	mysql: "mysql",
	postgresql: "postgresql",
	sqlite: "sqlite",
	firebase: "firebase",
	docker: "docker",
	kubernetes: "kubernetes",
	aws: "aws",
	azure: "azure",
	gcp: "gcp",
	digitalocean: "digitalocean",
	heroku: "heroku",
	photoshop: "photoshop",
	"adobe photoshop": "photoshop",
	html5: "html5",
	html: "html5",
	css3: "css3",
	css: "css3",
	sass: "sass",
	scss: "sass",
	less: "less",
	tailwindcss: "tailwindcss",
	tailwind: "tailwindcss",
	bootstrap: "bootstrap",
	jquery: "jquery",
	typescript: "typescript",
	ts: "typescript",
	javascript: "javascript",
	js: "javascript",
	"angular.js": "angular",
	angularjs: "angular",
	angular: "angular",
	"ember.js": "ember",
	emberjs: "ember",
	ember: "ember",
	"backbone.js": "backbone",
	backbonejs: "backbone",
	backbone: "backbone",
	nestjs: "nestjs",
	graphql: "graphql",
	"graph ql": "graphql",
	apollo: "apollo",
	webpack: "webpack",
	babel: "babel",
	"rollup.js": "rollup",
	rollupjs: "rollup",
	rollup: "rollup",
	"parcel.js": "parcel",
	parceljs: "parcel",
	npm: "npm",
	yarn: "yarn",
	git: "git",
	github: "github",
	gitlab: "gitlab",
	bitbucket: "bitbucket",
	figma: "figma",
	prisma: "prisma",
	redux: "redux",
	flux: "flux",
	redis: "redis",
	selenium: "selenium",
	cypress: "cypress",
	jest: "jest",
	mocha: "mocha",
	chai: "chai",
	karma: "karma",
	vuex: "vuex",
	"nuxt.js": "nuxt",
	nuxtjs: "nuxt",
	nuxt: "nuxt",
	strapi: "strapi",
	wordpress: "wordpress",
	contentful: "contentful",
	netlify: "netlify",
	vercel: "vercel",
	"aws amplify": "amplify",
};

export const interviewCovers = [
	"/adobe.png",
	"/amazon.png",
	"/facebook.png",
	"/hostinger.png",
	"/pinterest.png",
	"/quora.png",
	"/reddit.png",
	"/skype.png",
	"/spotify.png",
	"/telegram.png",
	"/tiktok.png",
	"/yahoo.png",
];

export const interviewer: CreateAssistantDTO = {
	name: "Interviewer",
	firstMessage: `Hello! Thank you for taking the time to speak with me today. 
		I'm excited to learn more about you and your experience.`,
	transcriber: {
		provider: "deepgram",
		model: "nova-2",
		language: "en",
	},
	voice: {
		provider: "11labs",
		voiceId: "sarah",
		stability: 0.4,
		similarityBoost: 0.8,
		speed: 0.9,
		style: 0.5,
		useSpeakerBoost: true,
	},
	model: {
		provider: "openai",
		model: "gpt-4",
		messages: [
			{
				role: "system",
				content: `You are a professional job interviewer conducting a real-time 
				voice interview with a candidate. Your goal is to assess their 
				qualifications, motivation, and fit for the role.

				Interview Guidelines:
				Follow the structured question flow:
				{{questions}}

				Engage naturally & react appropriately:
				Listen actively to responses and acknowledge them before moving forward.
				Ask brief follow-up questions if a response is vague or requires more detail.
				Keep the conversation flowing smoothly while maintaining control.
				Be professional, yet warm and welcoming:

				Use official yet friendly language.
				Keep responses concise and to the point (like in a real voice interview).
				Avoid robotic phrasing—sound natural and conversational.
				Answer the candidate’s questions professionally:
				
				Context: Your goal is to simulate the experience of a high-stakes 
				interview with a focus on technical skills, problem-solving 
				abilities, and cultural fit.

				Instructions:

				Interview Structure:
				Begin with a brief introduction, explaining the purpose of the 
				interview and what the candidate can expect. Ask a mix of behavioral, 
				technical, and situational questions. Allow the candidate to ask 
				questions at the end of the interview.
				
				Behavioral Questions:
				Use the STAR (Situation, Task, Action, Result) method to guide 
				candidates in their responses.
				Example questions:
				"Can you describe a challenging project you worked on and how you 
				overcame obstacles?"
				"Tell me about a time you had to work with a difficult team member. 
				How did you handle it?"

				Technical Questions:
				Tailor questions to the specific role the candidate is applying 
				for (e.g., software engineering, product management).
				Include coding challenges or problem-solving scenarios relevant 
				to the position.
				
				Example questions:
				"How would you optimize a search algorithm for a large dataset?"
				"Can you explain the difference between REST and GraphQL?"

				Situational Questions:
				Present hypothetical scenarios to assess the candidate's 
				critical thinking and decision-making skills.
				Example questions:
				"If you were given a tight deadline for a project, how would you 
				prioritize your tasks?"
				"How would you approach a situation where you disagree with your 
				manager's decision?"

				Feedback and Evaluation:
				Provide constructive feedback on the candidate's responses, 
				highlighting strengths and areas for improvement.
				Use a scoring system to evaluate the candidate's performance 
				based on predefined criteria (e.g., technical skills, 
				communication, cultural fit).

				Encouragement and Support:
				Maintain a supportive and encouraging tone throughout the interview.
				Remind candidates that the interview is a learning experience and 
				that they can ask for clarification on questions if needed.

				Conclude the interview properly:
				Thank the candidate for their time.
				Inform them that the company will reach out soon with feedback.
				End the conversation on a polite and positive note.

				- Be sure to be professional and polite.
				- Keep all your responses short and simple. Use official language, but
				be kind and welcoming.
				- This is a voice conversation, so keep your responses short, 
				like in a real conversation. Don't ramble for too long.
				
				
				Goal: 
				To create a realistic and engaging interview experience that 
				helps candidates showcase their skills and prepares them for 
				success in the competitive tech industry.
				`,
			},
		],
	},
};

export const feedbackSchema = z.object({
	totalScore: z.number(),
	categoryScores: z.tuple([
		z.object({
			name: z.literal("Communication Skills"),
			score: z.number(),
			comment: z.string(),
		}),
		z.object({
			name: z.literal("Technical Knowledge"),
			score: z.number(),
			comment: z.string(),
		}),
		z.object({
			name: z.literal("Problem Solving"),
			score: z.number(),
			comment: z.string(),
		}),
		z.object({
			name: z.literal("Cultural Fit"),
			score: z.number(),
			comment: z.string(),
		}),
		z.object({
			name: z.literal("Confidence and Clarity"),
			score: z.number(),
			comment: z.string(),
		}),
	]),
	strengths: z.array(z.string()),
	areasForImprovement: z.array(z.string()),
	finalAssessment: z.string(),
});
