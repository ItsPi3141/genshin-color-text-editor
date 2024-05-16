"use client";

import TextEditor from "@/components/TextEditor";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const [result, setResult] = useState("");
	return (
		<main className="flex flex-col justify-between items-center gap-8 bg-darkest p-4 sm:p-12 md:p-24 pb-8 min-h-screen text-light">
			<div className="flex flex-col gap-4 w-full max-w-[800px]">
				<h1 className="mb-4 sm:mb-8 text-2xl sm:text-3xl">Genshin Color Text Editor</h1>
				<p>Edit</p>
				<TextEditor onChange={(value) => setResult(value)} />
				<p className="mt-8">Result</p>
				<div className="border-2 border-accent bg-darker p-4 border-opacity-50 rounded w-full min-h-[3.75em]">
					{result.split("\n").map((line) => (
						<p key={null} className="[word-break:break-word] [overflow-wrap:anywhere]">
							{line}
						</p>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-4 w-full max-w-[800px]">
				<center className="text-sm">
					<p>Text size editing coming soon!</p>
					<p>
						Made by{" "}
						<Link target="_blank" href="https://github.com/ItsPi3141" className="text-highlight">
							ItsPi3141
						</Link>
						. Check out the source code on{" "}
						<Link target="_blank" href="https://github.com/ItsPi3141/genshin-color-text-editor" className="text-highlight">
							GitHub
						</Link>
						.
					</p>
				</center>
			</div>
		</main>
	);
}
