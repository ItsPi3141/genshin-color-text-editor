"use client";

import TextEditor from "@/components/TextEditor";
import { useState } from "react";

export default function Home() {
	const [result, setResult] = useState("");
	return (
		<main className="flex flex-col justify-start items-center gap-8 bg-darkest p-24 min-h-screen text-light">
			<h1 className="text-3xl">Genshin Color Text Editor</h1>
			<div className="flex flex-col gap-4 w-full max-w-[800px]">
				<p>Edit</p>
				<TextEditor onChange={(value) => setResult(value)} />
				<p className="mt-8">Result</p>
				<div className="border-2 border-accent bg-darker p-4 border-opacity-50 rounded w-full min-h-[3.75em]">
					{result.split("\n").map((line) => (
						<p key={null}>{line}</p>
					))}
				</div>
			</div>
		</main>
	);
}
