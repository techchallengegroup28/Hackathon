import 'bootstrap/dist/css/bootstrap.css'
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import '@/styles/globals.css'
import '@/styles/bootstrap.css'
import Header from '@/components/header';

const roboto = Roboto_Condensed({
	weight: ['400', '700'],
	variable: '--font-roboto-condensed',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: "Biblioteca da Pos Tech",
	description: "Biblioteca da Pos Tech",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={roboto.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
