import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider session={pageProps.session}>
			<NavBar />
			<Component {...pageProps}></Component>
		</Provider>
	);
}

export default MyApp;
