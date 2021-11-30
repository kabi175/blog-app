import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PostCard from '../components/PostCard';
import { IPost } from '../model/post';

const Home: NextPage = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	useEffect(() => {
		fetch('api/post')
			.then((res) => res.json())
			.then((res) => setPosts(res));
	}, []);
	return (
		<div className='bg-gray-300 w-screen flex flex-col items-center'>
			<Head>
				<title>Blogs</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='w-full h-14' />
			<div className='w-1/2 h-auto'>
				<div className='h-full w-full h-screen flex flex-col items-center gap-3 p-3'>
					{posts &&
						posts.map(({ title, username, _id }, key) => (
							<PostCard
								key={key}
								id={_id}
								topic={title}
								username={username}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default Home;
