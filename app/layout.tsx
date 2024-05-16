import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Genshin Colored Text Editor",
	description: "Add style to your chat messages and signature in Genshin.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
