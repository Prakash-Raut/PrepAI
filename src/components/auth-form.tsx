"use client";

import { signIn, signUp } from "@/actions/auth";
import { auth } from "@/lib/firebase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormField from "./form-field";

type FormType = "sign-in" | "sign-up";

interface AuthFormProps {
	type: FormType;
}

const authFormSchema = (type: FormType) => {
	return z.object({
		name:
			type === "sign-up"
				? z.string().min(3, { message: "Name is required" })
				: z.string().optional(),
		email: z.string().email({ message: "Email is required" }),
		password: z.string().min(8, { message: "Password is required" }),
	});
};

type AuthFormValues = z.infer<ReturnType<typeof authFormSchema>>;

const AuthForm = ({ type }: AuthFormProps) => {
	const router = useRouter();

	const form = useForm<AuthFormValues>({
		resolver: zodResolver(authFormSchema(type)),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: AuthFormValues) => {
		try {
			if (type === "sign-up") {
				const { name, email, password } = values;

				const userCredentials = await createUserWithEmailAndPassword(
					auth,
					email,
					password,
				);

				const result = await signUp({
					uid: userCredentials.user.uid,
					name: name as string,
					email,
					password,
				});

				if (!result?.success) {
					toast.error(result?.message);
					return;
				}

				toast.success("Account created successfully. Please sign in.");
				router.push("/sign-in");
			} else {
				const { email, password } = values;

				const userCredentials = await signInWithEmailAndPassword(
					auth,
					email,
					password,
				);

				const idToken = await userCredentials.user.getIdToken();

				if (!idToken) {
					toast.error("Sign-in failed. Please try again.");
					return;
				}

				await signIn({
					email,
					idToken,
				});

				toast.success("Sign-in successful!");
				router.push("/");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Something went wrong. Please try again.");
		}
	};

	const isSignIn = type === "sign-in";

	return (
		<div className="card-border lg:min-w-[566px]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image src="/logo.svg" alt="logo" height={32} width={38} />
					<h2 className="text-primary-100">Prep AI</h2>
				</div>
				<h3 className="text-center">Practice job interview with AI</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6 mt-4 form"
					>
						{!isSignIn && (
							<FormField
								name="name"
								control={form.control}
								label="Name"
								placeholder="John Doe"
								type="text"
							/>
						)}
						<FormField
							name="email"
							control={form.control}
							label="Email"
							placeholder="Your email address"
							type="email"
						/>
						<FormField
							name="password"
							control={form.control}
							label="Password"
							placeholder="Your password"
							type="password"
						/>
						<Button type="submit" className="btn">
							{isSignIn ? "Sign In" : "Create an account"}
						</Button>
					</form>
				</Form>
				<p className="text-center">
					{isSignIn ? "Don't have an account?" : "Already have an account?"}
					<Link
						href={!isSignIn ? "/sign-in" : "/sign-up"}
						className="font-bold text-user-primary ml-1"
					>
						{!isSignIn ? "Sign In" : "Sign Up"}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default AuthForm;
