import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<section>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Hello World
			</h1>
			<Button variant="outline">Click me!</Button>
			<ThemeSwitcher />
		</section>
	);
}
