import TextEditor from "@/components/TextEditor";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex flex-col justify-start items-center gap-8 bg-darkest p-24 min-h-screen text-light">
			{/* <h1 className="text-3xl">Genshin Color Text Editor</h1> */}
			<div className="flex gap-4 w-full max-w-[800px]">
				<TextEditor />
			</div>
		</main>
	);
}
