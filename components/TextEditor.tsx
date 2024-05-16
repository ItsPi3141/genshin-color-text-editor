"use client";

import { EditorContent, Extension, Node, useEditor } from "@tiptap/react";
import _Paragraph from "@tiptap/extension-paragraph";
import _Bold from "@tiptap/extension-bold";
import _Italic from "@tiptap/extension-italic";
import Color from "@tiptap/extension-color";
import { useState } from "react";
import _TextStyle from "@tiptap/extension-text-style";

const tags = {
	b: "\u0142", // 0042 or 0062
	i: "\u0169", // 0049 or 0069
	color: "\u0143olor", // c is 0043 or 0063
	size: "\u0153ize", // s is 0053 or 0073
};

const Document = Node.create({
	name: "doc",
	topNode: true,
	content: "block+",
});
const Text = Node.create({
	name: "text",
	group: "inline",
});
const Paragraph = _Paragraph.extend({
	renderHTML: () => {
		return ["p", { class: "root" }, 0];
	},
});
const Bold = _Bold.extend({
	name: "bold",
	renderHTML: ({ HTMLAttributes }) => {
		return [tags.b, HTMLAttributes, 0];
	},
});
const Italic = _Italic.extend({
	name: "italic",
	renderHTML: ({ HTMLAttributes }) => {
		return [tags.i, HTMLAttributes, 0];
	},
});
const TextStyle = _TextStyle.extend({
	name: "textStyle",
	renderHTML: ({ HTMLAttributes }) => {
		if (HTMLAttributes.style.includes("color:")) {
			return [tags.color, HTMLAttributes, 0];
		}
		if (HTMLAttributes.style.includes("font-size:")) {
			return [tags.size, HTMLAttributes, 0];
		}
		return ["span", HTMLAttributes, 0];
	},
});

const sanitizeHtmlOutput = (text: string): string => {
	if (text.startsWith("<br") || text.startsWith("&lt;br")) return "";

	// color tag
	const textColorRegex = new RegExp(`<${tags.color} style=(?:"|'|; ?).*?color: ?(.+?)(?:"|'|;).*?>`, "gi");
	const color: string = textColorRegex.exec(text)?.[1] || "";
	let newText = text;
	newText = text.replaceAll(textColorRegex, color !== "" ? `<${tags.color}=${color}>` : `<${tags.color}>`);
	return newText;
};

const TextEditor = ({ onChange }: Readonly<{ onChange: (value: string) => void }>): JSX.Element => {
	const editor = useEditor({
		extensions: [
			Document,
			Text,
			Paragraph,
			Bold,
			Italic,
			TextStyle,
			Color.configure({
				types: ["textStyle"],
			}),
		],
		content: "",
		editorProps: {
			attributes: {
				class: "bg-darker p-4 outline-none",
				autocomplete: "false",
				spellcheck: "false",
				placeholder: "Enter text here...",
			},
		},
		onUpdate: () => {
			onChange(
				sanitizeHtmlOutput(
					[...document.querySelectorAll(".root").values()]
						.map((node) => {
							if (node.innerHTML.startsWith("<br") || node.innerHTML.startsWith("&lt;br")) return "";
							return node.innerHTML;
						})
						.join("\n") || ""
				)
			);
		},
	});

	const [isBold, setBold] = useState(false);
	const [isItalic, setItalic] = useState(false);
	const [color, setColor] = useState("");

	return (
		<div className="flex flex-col border-2 border-accent border-opacity-50 rounded w-full overflow-hidden">
			<div className="flex gap-1 border-accent bg-dark px-4 py-2 border-b-2 border-opacity-20">
				<button
					type="button"
					className={`border-accent ${isBold ? "bg-accent text-darker" : "bg-darker text-light"} border border-opacity-10 rounded w-8 h-8`}
					onClick={() => {
						setBold(!isBold);
						editor?.chain().focus().toggleBold().run();
					}}
				>
					B
				</button>
				<button
					type="button"
					className={`border-accent ${isItalic ? "bg-accent text-darker" : "bg-darker text-light"} border border-opacity-10 rounded w-8 h-8`}
					onClick={() => {
						setItalic(!isItalic);
						editor?.chain().focus().toggleItalic().run();
					}}
				>
					I
				</button>
				<button
					type="button"
					className="border-accent bg-darker border border-opacity-10 rounded w-8 h-8"
					onClick={() => {
						document.getElementById("color-picker")?.click();
					}}
				>
					<div className="relative">
						<input
							type="color"
							id="color-picker"
							className="opacity-0 w-0 h-0 -translate-x-3 translate-y-4 pointer-events-none"
							onChange={(e) => {
								setColor(e.target.value);
								editor?.chain().focus().setColor(e.target.value).run();
							}}
						/>
						<span>A</span>
						<div
							className="right-0 bottom-[2px] left-0 absolute m-auto px-0.5 w-4 h-0.5"
							style={{
								background: color.length > 0 ? color : "linear-gradient(90deg, #fff8 50%, #fff0 50%)",
								backgroundSize: color.length > 0 ? "" : "6px 6px",
							}}
						/>
					</div>
				</button>
				<button
					type="button"
					className="border-accent bg-darker px-2 border border-opacity-10 rounded h-8 text-xs"
					onClick={() => {
						setColor("");
						editor?.chain().focus().unsetColor().run();
					}}
				>
					Clear color
				</button>
			</div>
			<EditorContent
				editor={editor}
				onInput={() => {
					setColor(editor?.getAttributes("textStyle")?.color || "");
				}}
				onClick={() => {
					setColor(editor?.getAttributes("textStyle")?.color || "");
				}}
				onKeyUp={() => {
					setColor(editor?.getAttributes("textStyle")?.color || "");
				}}
			/>
		</div>
	);
};
export default TextEditor;
