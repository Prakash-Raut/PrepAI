"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	placeholder?: string;
	type?: "text" | "email" | "password" | "number" | "file";
}

const FormField = <T extends FieldValues>({
	name,
	control,
	label,
	placeholder,
	type = "text",
}: FormFieldProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="label">{label}</FormLabel>
					<FormControl>
						<Input type={type} placeholder={placeholder} {...field} />
					</FormControl>
					<FormDescription>This is your public display name.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormField;
