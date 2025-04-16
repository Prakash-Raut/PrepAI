import GlobalProvider from "@/lib/providers/global-provider";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const monaSans = Mona_Sans({
	variable: "--font-mona-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Prep AI",
	description: "An AI Powered Mock Interview Platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body className={`${monaSans.className} antialiased`}>
				<GlobalProvider>{children}</GlobalProvider>
				<Toaster />
			</body>
		</html>
	);
}
